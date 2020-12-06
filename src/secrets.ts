import { connection } from "./db";
import { Secret } from "./db/entity/Secret";
import { randomString } from "./util/crypto";

enum SecretType {
    JWT = "JWT"
}

export let jwtSecret: string;

/**
 * Ensure that the secrets are initialized in the database
 */
export async function initialize(): Promise<void> {
    const SecretRepository = connection.getRepository(Secret);
    const secretObj = await SecretRepository.findOne(SecretType.JWT);
    if (secretObj) {
        jwtSecret = secretObj.value;
    } else {
        // Generate the JWT secret
        jwtSecret = await randomString(32);

        // Save it in the database
        const persist = new Secret();
        persist.key = SecretType.JWT;
        persist.value = jwtSecret;
        await SecretRepository.save(persist);
    }

    // const secretObj2 = await SecretRepository.findOne(SecretType.JWT);
    // console.log(secretObj2);
}
