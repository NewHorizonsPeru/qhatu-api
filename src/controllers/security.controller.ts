import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

const securityController = express.Router();

securityController.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (request: any, response: any, next: any) => {
    try {
      response.json({ message: "Ok" });
    } catch (error) {
      next(error);
    }
  }
);

export default securityController;
