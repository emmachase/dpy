import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import { Logger } from "../logger";
import { Upload } from "./entity/Upload";

const logger = new Logger("db");

// const getConnectionQueue: (() => void)[] = [];
export let connection: Connection;
export async function initialize(): Promise<void> {
    connection = await createConnection();

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
