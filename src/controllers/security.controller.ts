import express from "express";
import passport from "passport";
import userDto from "../dtos/user.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";
import UserService from "../services/user.service";
import { generateJwt } from "../util/jwt.util";

const securityController = express.Router();
const userService = new UserService();
securityController.post(
  "/signIn",
  passport.authenticate("local", { session: false }),
  async (request: any, response: any, next: any) => {
    try {
      const { user } = request;
      const token = generateJwt(user);
      response.json({ ...user, token });
    } catch (error) {
      next(error);
    }
  }
);

securityController.post(
  "/signUp",
  async (request: any, response: any, next: any) => {
    try {
      const userToCreate: userDto = request.body;
      const user = await userService.add(userToCreate);
      response.status(HttpStatusCode.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }
);

export default securityController;
