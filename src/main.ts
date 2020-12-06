import express from "./webserver";
import chalk from "chalk";

import { Logger } from "./logger";
import { getConfig } from "./config";
import { initialize as initDB } from "./db";
import { initialize as initSecrets } from "./secrets";
import { clearOldTokens } from "./api/auth";
import WebRouter from "./web/router";
import APIRouter from "./api";
import { HOURS } from "./util/time";
import { ImageRouter } from "./imagehost";

const logger = new Logger("main");

express.enable("trust proxy"); // Allow forwarded https

void getConfig().then(config =>
    initDB().then(async () => {
        await initSecrets();
        await clearOldTokens();
        setInterval(clearOldTokens, 6*HOURS);

        express.use(WebRouter);
        express.use("/api", APIRouter);

        // The main gal
        express.use(ImageRouter);

        express.listen(config.server.listen, () =>
            logger.info("Server started and listening on port", chalk.yellow(config.server.listen)));
    }));
