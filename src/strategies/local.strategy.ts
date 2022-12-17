import { Strategy } from "passport-local";
import boom from "@hapi/boom";
import UserService from "../services/user.service";
import { validateHash } from "../util/bcrypt.util";

const userService = new UserService();
const localStrategy = new Strategy(
  async (username: string, password: string, done: any) => {
    try {
      const user = await userService.getByUsername(username);
      console.log(`[USER]: ${user}`);
      if (!user) {
        done(boom.badData(), false);
      }
      const validateCredentials = await validateHash(password, user.password);
      if (!validateCredentials) {
        done(boom.badData(), false);
      }
      done(null, user);
    } catch (error) {
      done(boom.internal(), false);
    }
  }
);

export { localStrategy };
