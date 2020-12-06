import "reflect-metadata";
import {Connection, createConnection, getConnectionOptions} from "typeorm";
import { Logger } from "../logger";
import { Upload } from "./entity/Upload";
import express from "../webserver";

const logger = new Logger("db");

// const getConnectionQueue: (() => void)[] = [];
export let connection: Connection;
export async function initialize(): Promise<void> {
    const options = await getConnectionOptions(express.get("env"));
    connection = await createConnection({ ...options, name: "default" });

    logger.info("Database connection initialized");
    // getConnectionQueue.forEach(x => x());
}

// export function getConnection(): Promise<Connection> {
//     if (connection) {
//         return Promise.resolve(connection);
//     }

//     return new Promise(resolve =>
//         getConnectionQueue.push(() => {
//             resolve(connection);
//         }));
// }
