import { createRouter } from "./route-helper";
import passport from "passport";
import { Router, Request } from "../types/express";
import { NextFunction, Response } from "express";
import setContextMiddleware from "../middleware/context";
import config from "../config/config";
import urlBuilder from "../util/http";
import User from "../models/user";

const router: Router = createRouter();

const authSuccessRedirecter = (token: string) =>
  urlBuilder(config.ui.host, [], { token });

//@ts-ignore
const authFailureRedirector = (error?: ApiError) =>
  urlBuilder(config.ui.host, [config.ui.routes.login], {
    [config.ui.queryParams.authError]: Boolean(error)
  });

//Google authentication route
router.get(
  "/google",
  //@ts-ignore
  setContextMiddleware("completing Google authentication"),
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//Google authentication callback route
router.get(
  config.auth.google.callbackRoute.replace("/auth", ""),
  //@ts-ignore
  setContextMiddleware("completing Google authentication"),
  (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      "google",
      {
        //Redirect to UI login page with auth error param true
        failureRedirect: authFailureRedirector()
      },
      (_err, user) => {
        try {
          if (user) {
            if (!(user instanceof User)) {
              res.redirect(authFailureRedirector());
            }
            //const token = "a new user token";
            const token = user.createToken();
            //Redirect back to the UI
            res.redirect(authSuccessRedirecter(token));
          } else {
            //Handle authentication failure
            next();
          }
        } catch (error) {
          res.redirect(authFailureRedirector(error));
        }
      }
    )(req, res, next)
);

export default router;
