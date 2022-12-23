import { Strategy } from "passport-local";
import boom from "@hapi/boom";
import UserService from "../services/user.service";
import { validateHash } from "../util/bcrypt.util";

const userService = new UserService();
const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (username: string, password: string, done: any) => {
    try {
      const user = await userService.getByUsername(username);
      if (!user) {
        done(boom.badData("Username or Password incorrect."), false);
      }
      console.log("AVC");
      const validateCredentials = await validateHash(password, user.password!);

      if (!validateCredentials) {
        done(boom.badData("Username or Password incorrect."), false);
      }
      done(null, user);
    } catch (error) {
      done(boom.internal(), false);
    }
  }
);

export default localStrategy;
