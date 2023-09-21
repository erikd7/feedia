//Middleware to set the action context for a request. This is later used by the error handling middleware.
import { ExpressMiddleware } from "../types/express";
import { ReasonPhrases } from "http-status-codes";
import ApiError from "../models/error";
import passport from "passport";

const authentication = passport.authenticate("google", {
  scope: ["profile", "email"]
});

const parseUser: ExpressMiddleware = (req, _res, next) => {
  if (!req.isAuthenticated()) {
    //Throw a 401 error
    throw new ApiError(
      "You are not authorized to access this resource.",
      ReasonPhrases.UNAUTHORIZED,
      req.actionContext
    );
  }

  next();
};

export default [authentication, parseUser];
