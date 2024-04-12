import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import v1Router from "./routes";
import {loggerMiddleware} from "./validators/logger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/v1', v1Router)

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});