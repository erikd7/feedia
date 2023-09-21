import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  function (jwtPayload, done) {
    done(null, jwtPayload);
  }
);

//Use the strategy in passport
passport.use("jwt", jwtStrategy);
