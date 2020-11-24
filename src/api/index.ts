import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

export const APIRouter = express.Router();

APIRouter.use(bodyParser.json());
APIRouter.use(cookieParser());

// Import the api afterwards so the middleware is applied correctly
import "./auth";

export default APIRouter;
