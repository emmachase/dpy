import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./auth";
import { UploadRouter } from "./upload";


export const APIRouter = express.Router();

APIRouter.use(bodyParser.json());
APIRouter.use(cookieParser());

APIRouter.use(AuthRouter);
APIRouter.use(UploadRouter);

export default APIRouter;

