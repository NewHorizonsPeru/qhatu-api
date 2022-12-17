import passport from "passport";
import { localStrategy } from "./local.strategy";

const registerStrategies = () => {
  console.log("Registering Strategies");
  passport.use(localStrategy);
};

export default registerStrategies;
