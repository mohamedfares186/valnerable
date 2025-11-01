import express, { type Request, type Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.send("<h1>Hello World</h1>");
});

export default app;
