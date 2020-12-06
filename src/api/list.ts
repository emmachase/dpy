import { Router } from "express";
import { assign, merge, pick } from "lodash";
import { LessThan, Like } from "typeorm";
import { connection } from "../db";
import { Upload } from "../db/entity/Upload";
import { implies } from "../util/combinator";
import { formatDatetime } from "../util/time";
import { requireAccessToken } from "./auth";

export const ListRouter = Router();

const DEFAULT_LIMIT = 30;

ListRouter.get("/list", requireAccessToken, async (req, res) => {
    const before = implies(req.query.before, parseInt);
    const limit = +(req.query.limit ?? DEFAULT_LIMIT);
    const mime_filter = req.query.mfilter;

    const results = await connection.manager.find(Upload,
        {
            take: limit,
            relations: ["tags"],

            order: { id: "DESC" },

            where: req.query.gallery ? [
                merge({}, before && { id: LessThan(before) }, { mime: Like("%image%")}),
                merge({}, before && { id: LessThan(before) }, { mime: Like("%video%")})
            ] : merge({}, before && { id: LessThan(before) },
                mime_filter && {
                    mime: Like("%" + mime_filter + "%")
                })
        });

    res.send(results
        .map(r => assign(r, { tags: r.tags.map(t => t.value) }))
        .map(r => pick(r, "id", "name", "created", "mime", "description", "tags")));
});
