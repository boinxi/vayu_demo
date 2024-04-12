import {NextFunction, Request, Response} from "express";
import {logger} from "../logger";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const time = new Date(Date.now()).toString();
    const msg = `${req.method} ${req.path} ${time}`;
    logger.info(msg);
    next();
}