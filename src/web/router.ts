import express from "express";
import cookieParser from "cookie-parser";
import template, { PageMeta } from "./template";

import LoginPage from "./pages/login";
import GalleryPage from "./pages/gallery";
import UploadPage from "./pages/upload";
import { getSiteConfig } from "../config";
import { AuthCheckRequest, checkAuthed } from "../api/auth";
import { Logger } from "../logger";

const logger = new Logger("page-router");

const router = express.Router();
router.use(cookieParser());

const NO_AUTH_REDIR = "/login"; // Where to redirect to auth
const AUTH_REDIR = "/gallery"; // Where to redirect to auth
const routing: Record<string, {
    page: PageMeta,
    needsAuth: boolean
}> = {
    "/login": { page: LoginPage, needsAuth: false },
    "/gallery": { page: GalleryPage, needsAuth: true },
    "/upload": { page: UploadPage, needsAuth: true }
};

router.get("/", (_req, res) => res.redirect(NO_AUTH_REDIR));

for (const route in routing) {
    const routeInfo = routing[route];
    router.get(route, checkAuthed, async (req: AuthCheckRequest, res) => {
        logger.trace(route, routeInfo.needsAuth, req.authed);

        // if (routeInfo.needsAuth && !req.authed) {
        //     return res.redirect(NO_AUTH_REDIR);
        // } else if (!routeInfo.needsAuth && req.authed) {
        //     return res.redirect(AUTH_REDIR);
        // }

        res.send(template(await getSiteConfig(req.hostname), routeInfo.page));
    });
}

router.use(express.static("public"));

export default router;
