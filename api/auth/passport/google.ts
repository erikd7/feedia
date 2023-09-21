import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../../config/config";
import { mapGoogleProfileToUser } from "../mapping";
import { register } from "../../domain/auth";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: config.auth.google.callbackRoute
  },
  async (_accessToken, _refreshToken, profile, done) => {
    //Login/register the user
    const user = await register(mapGoogleProfileToUser(profile));

    return done(null, user); //Assigned to req.user
  }
);

//Use the strategy in passport
passport.use("google", googleStrategy);
