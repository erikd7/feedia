import express from "express";
import logger from "morgan";
import { errorMiddleware } from "./middleware/error";
import userRouter from "./routes/user";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/user", userRouter);

//Error Middleware
app.use(errorMiddleware);

export default app;
