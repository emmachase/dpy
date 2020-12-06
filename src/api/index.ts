import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./auth";
import { UploadRouter } from "./upload";
import { ListRouter } from "./list";


export const APIRouter = express.Router();

APIRouter.use(bodyParser.json());
APIRouter.use(cookieParser());

APIRouter.use(AuthRouter);
APIRouter.use(UploadRouter);
APIRouter.use(ListRouter);

export default APIRouter;

