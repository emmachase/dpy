import client from "prom-client";
import express from "express";
import { getConfig } from "../config";
import chalk from "chalk";
import { Logger } from "../logger";

const logger = new Logger("metrics");

const metrics_prefix = "dpy_";
// client.collectDefaultMetrics({
//     prefix: metrics_prefix
// });

export async function initMetrics(): Promise<void> {
    const app = express();
    const config = await getConfig();

    app.get("/metrics", async (_req, res) => {
        res.set("Content-Type", client.register.contentType);
        res.send(await client.register.metrics());
    });

    app.listen(config.server.metricsPort, () =>
        logger.info("Metrics listening on port", chalk.yellow(config.server.metricsPort)));
}

export const metrics = new Proxy(client, {
    get(t, prop: keyof typeof client | "prefix") {
        if (prop === "prefix") return metrics_prefix;
        else return t[prop];
    }
}) as typeof client & { prefix: string };
