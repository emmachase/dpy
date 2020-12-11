import { Router } from "express";
import { requireUploadToken } from "./auth";
import { body } from "express-validator";
import multer from "multer";
import { getSiteConfig } from "../config";
import { promisify } from "util";
import { mkdir as mkdirNode, unlink } from "fs";
import path from "path";
import { randomString36 } from "../util/crypto";
import { Upload } from "../db/entity/Upload";
import { pickTemplateName } from "../service/naming";
import { Tag } from "../db/entity/Tag";
import { connection } from "../db";
import uniq from "lodash/uniq";
import { Logger } from "../logger";
const mkdir = promisify(mkdirNode);

const logger = new Logger("upload");

export const UploadRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function directoryDiscriminator(req: Express.Request, file: Express.Multer.File): string {
    // Implementation dependant
    // Subject to change
    const date = new Date();
    return `./${date.getUTCFullYear()}-${date.getUTCMonth()}`;
}

const fileUploader = multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            try {
                const config = await getSiteConfig(req.hostname);

                const discriminator = directoryDiscriminator(req, file);
                const directory = path.join(config.directory, discriminator);

                // Make sure it exists
                await mkdir(directory, {
                    recursive: true
                });

                cb(null, directory);
            } catch (e) {
                cb(e, "");
            }
        },

        filename: async (_req, file, cb) => {
            const rand = await randomString36(32);
            const ext = path.extname(file.originalname);
            const ident = path.basename(file.originalname, ext) + "." + rand;

            // We don't want names getting too long, so we truncate to 127 chars, preserving rhs
            const full = (ident + ext).substr(-127);
            logger.debug("Reserved space for", full);
            cb(null, full);
        }
    })
});

const RETRIES = 20, TOO_MANY_TRIES = "Couldn't generate file name, exceeded retry count";
async function generateName(template: string, ext: string) {
    let name: string, tries = 0;

    do {
        if (tries++ >= RETRIES) {
            throw TOO_MANY_TRIES;
        }

        name = await pickTemplateName(template) + ext;
    } while (await connection.manager.findOne(Upload, { name }));

    return name;
}


/**
 * @api {post} /upload Upload one file
 * @apiName Upload
 * @apiGroup Upload
 * @apiDescription Should be a multipart form request
 *
 * @apiParam {String?} name The filename
 * @apiParam {String?} desc The description of the file
 * @apiParam {String?} tags Associating tags
 * @apiParam {File}    file The file
 *
 * @apiSuccess (Body) {String} accessToken Token that can be used for API requests.
 * @apiSuccess (Cookie) {String} refreshToken A http-only cookie set, to be used for the refresh endpoint.
 */
UploadRouter.post("/upload",
    requireUploadToken,

    // Validation
    body("name").isAlphanumeric().optional(),
    body("desc")
        .optional()
        .trim(),
    body("tags").isAlphanumeric().optional(),

    fileUploader.single("file"),

    async (req, res) => {
        const config = await getSiteConfig(req.hostname);

        // Parse the tags out
        const tags: string[] = req.body.tags?.split(/,\s*/)
            .map((x: string) => x.trim().toLowerCase()) ?? [];

        const upload = new Upload();
        try {
            upload.name =
                req.body.name
                ?? await generateName(
                    config.namingTemplate,
                    path.extname(req.file.filename));
        } catch (e) {
            if (e === TOO_MANY_TRIES) {
                unlink(req.file.path, () => { /* We don't care if this fails */ });
                return res.status(500).send({ ok: false, err: e });
            } else {
                throw e;
            }
        }

        upload.description = req.body.desc ?? "";
        upload.tags = uniq(tags).map(value => ({ value })) as Tag[];

        upload.filePath = req.file.path;
        upload.mime = req.file.mimetype;

        // Delete any pre-existing data
        await connection.manager.getRepository(Tag).delete({ upload });

        // Insert the new file
        await connection.manager.save(upload);


        res.status(200).send({
            ok: true, url: `${req.protocol}://${req.hostname}/${upload.name}`
        });
    });
