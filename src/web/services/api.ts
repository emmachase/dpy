export const API_ROOT = "/api";
export function apiPath(endpoint: string): string {
    return API_ROOT + "/" + endpoint;
}


export async function callAPI(opts: {endpoint: string, method?: string, body?: unknown}): Promise<Response> {
    const path = apiPath(opts.endpoint);

    const access = await fetch(path, {
        method: opts.method || "POST",
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        headers: {
            "Content-Type": "application/json",
            "Authentication": "Bearer " + localStorage.getItem("accessToken")
        }
    });

    if (access.ok) {
        return access;
    } else if (access.status === 401) {
        try {
            const resp = await callAPI({endpoint: "/refresh"});
            const { accessToken, expires } = await resp.json();
            localStorage.setItem("accessToken", accessToken);
        } catch {
            // Go back out to login
            localStorage.removeItem("accessToken");
            window.location.reload();
        }
    }

    throw access;
}
