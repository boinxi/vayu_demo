import express, {Request, Response} from "express";
import {UserService} from "../../services/userService";

const usersRouter = express.Router();

usersRouter.get("/", async  (req: Request, res: Response) => {
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const s = new UserService();
    const users = await s.getUsers();
    res.send(users);
});

export default usersRouter;