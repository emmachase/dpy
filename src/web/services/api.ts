export const API_ROOT = "/api";
export function apiPath(endpoint: string): string {
    return API_ROOT + "/" + endpoint;
}

const REFRESH_ENDPOINT = "/refresh";
export async function callAPI(opts: {endpoint: string, queries?: Record<string, string>, method?: string, body?: unknown}): Promise<Response> {
    const path = apiPath(opts.endpoint);

    const queryString = opts.queries ?
        "?" + Object.entries(opts.queries)
            .map(([k, v])=>`${k}=${encodeURIComponent(v)}`).join("&") : "";

    const access = await fetch(path + queryString, {
        method: opts.method || "POST",
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
    });

    if (access.ok) {
        return access;
    } else if (access.status === 401 && opts.endpoint !== REFRESH_ENDPOINT) {
        try {
            const resp = await callAPI({endpoint: REFRESH_ENDPOINT});
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
