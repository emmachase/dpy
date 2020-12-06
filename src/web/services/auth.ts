import { apiPath } from "./api";

const LOGIN_URL = apiPath("login");
export async function tryLogin(password: string): Promise<boolean> {
    try {
        const access = await fetch(LOGIN_URL, {
            method: "POST",
            body: JSON.stringify({password}),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (access.ok) {
            const rjson = await access.json();
            if (rjson.accessToken) {
                console.log(rjson.accessToken);
                localStorage.setItem("accessToken", rjson.accessToken);

                return true;
            }
        }
    } catch (e) {
        console.log(e);
    }

    return false;
}

const LOGOUT_URL = apiPath("logout");
export async function doLogout(): Promise<boolean> {
    localStorage.removeItem("accessToken");

    try {
        await fetch(LOGOUT_URL, {
            method: "POST"
        });

        return true;
    } catch (e) {
        console.log(e);
    }

    return false;
}

