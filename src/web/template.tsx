import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { SiteConfig } from "../config";

export interface AppParams {
    title: string
    subtitle?: string
    notice?: string
    logo?: string
}

export type PageRootComponent = React.FunctionComponent<{
    appParams: AppParams
}>

export interface PageMeta {
    fileName: string
    pageTitle: string | ((params: AppParams) => string)
    root: PageRootComponent
    needsAuth: boolean
    redirWhenAuthed?: boolean
}

// const cssFiller = fs.readFileSync("./public/styles.css"); // TODO currently not used because of watch modes

/**
 * Takes a page module and generates the HTML response to send to the client using Server-Side Rendering.
 * @param config The active configuration for this Site, obtain from {@link getSiteConfig}
 * @param ctx The page object, obtain from loading default export from the correct page.
 */
export default function(config: SiteConfig, ctx: PageMeta): string {
    const params: AppParams = {
        title: config.title,
        subtitle: config.subtitle,
        notice: config.notice,
        logo: config.logo
    };

    const mode = process.env.NODE_ENV ?? "production";

    return /*html*/`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>${typeof ctx.pageTitle === "function" ? ctx.pageTitle(params) : ctx.pageTitle}</title>
            <link rel="icon" href="favicon.png">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap" rel="stylesheet">
            <style>${fs.readFileSync("./public/styles.css").toString("ascii")}</style>

            ${ctx.needsAuth ? /*html*/`
                <script>
                    if (!localStorage.getItem("accessToken")) {
                        window.location.href = "/login";
                    }
                </script>
            ` : ""}

            ${ctx.redirWhenAuthed ? /*html*/`
                <script>
                    if (localStorage.getItem("accessToken")) {
                        window.location.href = "/gallery";
                    }
                </script>
            `: ""}
        </head>
        <body>
            <div id="approot">${ReactDOMServer.renderToString(<ctx.root appParams={params}/>)}</div>
            <script crossorigin src="https://unpkg.com/react@17/umd/react.${mode}.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.${mode}.js"></script>
            <script type="text/javascript">
                const require = (name) => ({
                    react: React
                })[name];
            </script>
            <script src="/js/${ctx.fileName}.js"></script>
            <script type="text/javascript">
                const container = document.getElementById("approot");
                ReactDOM.hydrate(React.createElement(__page.default.root, {
                    appParams: ${JSON.stringify(params)}
                }), container);
            </script>
        </body>
        </html>`;
}
