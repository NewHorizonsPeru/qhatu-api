import passport from "passport";
import jwtStrategy from "./jwt.strategy";
import { localStrategy } from "./local.strategy";

const registerStrategies = () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};

export default registerStrategies;
