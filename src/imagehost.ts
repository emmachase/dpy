import { Router } from "express";
import { connection } from "./db";
import { Upload } from "./db/entity/Upload";
import { promisify } from "util";
import { readFile as nativeReadFile } from "fs";
import sharp from "sharp";
const readFile = promisify(nativeReadFile);

export const ImageRouter = Router();

const CACHE_SIZE = 50;
let rollingCache: {
    name: string
    size: number | null
    file: Buffer
    mime: string
}[] = [];

function insertIntoCache(name: string, size: number | null, file: Buffer, mime: string) {
    rollingCache.unshift({ name, size, file, mime });
    if (rollingCache.length > CACHE_SIZE) {
        rollingCache.pop();
    }
}

export function purgeCache(): void {
    rollingCache = [];
}

ImageRouter.get("/:file", async (req, res, next) => {
    const thumbSize = +req.query.size! || null;
    const filename = req.params.file ?? "<>";

    // First check if it's in the cache
    const cachedFile = rollingCache.find(x =>
        x.name === filename &&
        x.size === thumbSize
    );

    if (cachedFile) {
        return res
            .contentType(cachedFile.mime)
            .send(cachedFile.file);
    }

    const file = await connection.manager.findOne(Upload, { name: filename });

    if (file) {
        // Result vars
        let data;

        if (file.mime.startsWith("image")) {
            const image = sharp(file.filePath);
            if (thumbSize) {
                const meta = await image.metadata();
                const sizer = meta.width! > meta.height!
                    ? { height: thumbSize } : { width: thumbSize };

                data = await image.resize(sizer).toBuffer();

                insertIntoCache(file.name, thumbSize, data, file.mime);
            } else {
                data = await image.toBuffer();

                insertIntoCache(file.name, null, data, file.mime);
            }
        } else {
            data = await readFile(file.filePath);
        }

        res
            .contentType(file.mime)
            .send(data);
    } else {
        next();
    }
});
