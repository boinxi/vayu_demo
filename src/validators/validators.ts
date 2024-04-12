import {NextFunction, Request, Response} from "express";

export const hasNameParam = (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.name;

    if (!name) {
        return res.status(400).send({error: "Invalid name provided."});
    }
    next();
};
