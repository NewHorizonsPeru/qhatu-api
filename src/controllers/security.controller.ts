import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import { generateJwt } from "../util/jwt.util";

const securityController = express.Router();

securityController.post(
  "/login",
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

export default securityController;
