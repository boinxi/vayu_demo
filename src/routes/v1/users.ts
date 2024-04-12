import express, {Request, Response} from "express";
import {hasIdParam, hasStringParam, updateStatusesSchema, validateRequestBody} from "../../validators/validators";
import {UsersRepo} from "../../globalRepos";
import {logger} from "../../logger";

const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const users = await UsersRepo.getUsersPaginated(offset, limit);
    res.send(users);
});

usersRouter.get("/byName/:name", hasStringParam('name'), async (req: Request, res: Response) => {
    const name = req.params.name;

    try {
        const users = await UsersRepo.getUsersByName(name);
        if (!users || !users.length) { // could have returned an empty array instead...
            return res.status(404).send({error: "No users found."});
        }
        return res.send(users);

    } catch (e: any) {
        logger.error(e);
        res.status(500).send('Internal server error')

    }
});

usersRouter.get("/byEmail/:mail", hasStringParam('mail'), async (req: Request, res: Response) => {
    const mail = req.params.mail;

    try {
        const user = await UsersRepo.getUsersByMail(mail);

        if (!user) {
            return res.status(404).send({error: "User not found."});
        }
        return res.send(user);
    } catch (e: any) {
        logger.error(e);
        res.status(500).send('Internal server error')
    }

});

usersRouter.patch('/updateStatuses', validateRequestBody(updateStatusesSchema), async (req: Request, res: Response) => {
    /**
     * Due to time constraints, we're just waiting for all the update process to complete.
     * if the process is too long, we could return a 202 status code and a location header with the
     * URL to check the status of the process or a websocket to notify the user when the process is done.
     */
    const updates = req.body.updates;

    try {
        const result = await UsersRepo.updateStatuses(updates);
        res.send(result);

    } catch (e: any) {
        logger.error(e);
        res.status(500).send('Internal server error')
    }
});

usersRouter.patch('/:id/removeGroupInfo', hasIdParam, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const result = await UsersRepo.setGroupToNull(id);
        res.send(result);
    } catch (e: any) {
        logger.error(e);
        res.status(500).send('Internal server error')
    }
});

export default usersRouter;