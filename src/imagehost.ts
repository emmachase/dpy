import { Router } from "express";
import { connection } from "./db";
import { Upload } from "./db/entity/Upload";
import { promisify } from "util";
import { readFile as nativeReadFile } from "fs";
import sharp from "sharp";
import { metrics } from "./service/metrics";
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

const imageRequestsMetric = new metrics.Counter({
    name: metrics.prefix + "image_requests",
    help: "Counter of image requests"
});

const imageCacheMetric = new metrics.Counter({
    name: metrics.prefix + "image_cache",
    help: "Counter of whether image requests are in cache",
    labelNames: ["access"]
});

const requestDurationHistogram = new metrics.Histogram({
    name: metrics.prefix + "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds histogram",
    buckets: [0.01, 0.1, 0.5, 1, 5, 10, 60],
    labelNames: ["method", "handler", "code"],
});

ImageRouter.get("/:file", async (req, res, next) => {
    const thumbSize = +req.query.size! || null;
    const filename = req.params.file ?? "<>";

    let wasImage = false;
    const end = requestDurationHistogram.startTimer();
    res.on("finish", () =>
        end({
            method: req.method,
            handler: wasImage ? "image" :
                (res.statusCode === 404 ? "not_found" :
                    new URL(req.url, `http://${req.hostname}`).pathname),
            code: res.statusCode,
        })
    );
    // First check if it's in the cache
    const cachedFile = rollingCache.find(x =>
        x.name === filename &&
        x.size === thumbSize
    );

    if (cachedFile) {
        wasImage = true;
        imageRequestsMetric.inc();
        imageCacheMetric.inc({ access: "hit" });

        return res
            .contentType(cachedFile.mime)
            .send(cachedFile.file);
    }

    const file = await connection.manager.findOne(Upload, { name: filename });

    if (file) {
        wasImage = true;
        imageRequestsMetric.inc();
        imageCacheMetric.inc({ access: "miss" });

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
