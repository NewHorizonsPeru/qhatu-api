import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifiedCallback,
} from "passport-jwt";
import { enviroment } from "../config/enviroment.config";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: enviroment.SecretKey,
};

const jwtStrategy = new Strategy(
  options,
  (payload: any, done: VerifiedCallback) => {
    try {
      return done(null, payload);
    } catch (error) {
      return done(error, false);
    }
  }
);

export default jwtStrategy;
