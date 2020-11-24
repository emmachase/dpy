import argon from "argon2";
import crypto from "crypto";

/**
 * Generates a cryptographically secure string of random bytes.
 * @param length How many bytes of data to generate, this is **NOT** the length of the result string.
 */
export function randomByteString(length = 32): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(length, (err, buf) => {
            if (err) {
                reject(err);
            }

            resolve(buf.toString("base64"));
        });
    });

}

/**
 * Generates a cryptographically secure string of random ascii characters.
 * @param length The length of the resultant string
 */
export async function randomString(length = 32): Promise<string> {
    const str = await randomByteString(length);
    return str.substring(0, length);
}

/**
 * Returns the application hash of a password+salt combo.
 * @param password The user supplied password
 * @param salt A generated salt, should have been constructed by {@link randomByteString}
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
    return await argon.hash(password, {
        salt: Buffer.from(salt, "base64"),
        type: argon.argon2id
    });
}

/**
 * Verifies an application generated password hash
 * @param password The user supplied password
 * @param hash The stored password hash
 * @param salt The stored password salt
 */
export async function verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    return await argon.verify(hash, password, {
        salt: Buffer.from(salt, "base64"),
        type: argon.argon2id
    });
}
