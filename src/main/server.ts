import cors from "cors";
import express, { Request, Response } from "express";
import env from "./env";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Hello world! Server is running.",
  });
});

app.use("/api", routes);

export default app;
