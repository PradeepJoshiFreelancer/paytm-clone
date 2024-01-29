import express, { ErrorRequestHandler, Request, Response, json } from "express";
import cors from "cors";
import { router } from "./routes";
const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use(json());

app.use("/api/v1", router);

app.use((req, res, next) => {
  res.status(404).send({msg: "404 route not found"});
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
