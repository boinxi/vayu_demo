import {NextFunction, Request, Response} from "express";
import Joi, {Schema} from "joi";
import {logger} from "../logger";

export const hasStringParam = (fieldName: string) => (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[fieldName];

    if (!value) {
        return res.status(400).send({error: `Invalid ${fieldName} provided.`});
    }
    next();
};

export const hasIdParam = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send({error: "Invalid ID provided."});
    }
    next();
};

export function validateRequestBody(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        if (error) {
            const messages = error.details.map(detail => detail.message);
            logger.info('Schema validation: ' + messages)
            res.status(400).json({errors: messages});
        } else {
            next();
        }
    };
}

export const updateStatusesSchema = Joi.object({
    updates: Joi.array().items(Joi.object({
        id: Joi.number().integer().required(),
        status: Joi.string().valid('pending', 'active', 'blocked').required()
    }))
}).required();
