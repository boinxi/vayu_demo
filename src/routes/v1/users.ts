import express, {Request, Response} from "express";
import {hasNameParam} from "../../validators/validators";
import {UsersRepo} from "../../globalRepos";

const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const users = await UsersRepo.getUsersPaginated(offset, limit);
    res.send(users);
});

usersRouter.get("/byName/:name", hasNameParam, async (req: Request, res: Response) => {
    const name = req.params.name;
    const users = await UsersRepo.getUsersByName(name);

    if (!users) {
        return res.status(404).send({error: "User not found."});
    }
    return res.send(users);
});

export default usersRouter;