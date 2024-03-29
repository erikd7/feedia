import express from "express";
import logger from "morgan";
import expressSession from "express-session";
import passport from "passport";
import { errorMiddleware } from "./middleware/error";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import titleRouter from "./routes/title";
import ratingRouter from "./routes/rating";
import listRouter from "./routes/list";
import "./auth/passport/google";
import "./auth/passport/jwt";

const app = express();

//Basic setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Session setup
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true
  })
);

//Passport auth setup---------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

//Auth routes
app.use("/auth", authRouter);

app.use(passport.authenticate("jwt", { session: false }));

//Routes-----------------------------------------------------------------------------
app.use("/user/list", listRouter);
app.use("/user", userRouter);
app.use("/title", titleRouter);
app.use("/title/:id/rating", ratingRouter);

app.use(errorMiddleware);

export default app;
