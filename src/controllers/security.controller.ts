import express from "express";
import passport from "passport";
import userDto from "../dtos/user.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";
import UserService from "../services/user.service";
import { getRoles } from "../util/fake.data";
import { generateJwt } from "../util/jwt.util";

const securityController = express.Router();
const userService = new UserService();
/**
 * POST CATEGORY
 * @swagger
 * /signIn:
 *   post:
 *     tags:
 *      - Security
 *     summary: SignIn application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The username.
 *                 example: admin@domain.com
 *               password:
 *                 type: string
 *                 description: The password.
 *                 example: 123456
 *     responses:
 *       201:
 */
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
/**
 * POST CATEGORY
 * @swagger
 * /signUp:
 *   post:
 *     tags:
 *      - Security
 *     summary: SignUp application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The username.
 *                 example: admin@domain.com
 *               password:
 *                 type: string
 *                 description: The password.
 *                 example: 123456
 *     responses:
 *       201:
 */
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

securityController.get("/getRoles", (request: any, response: any) => {
  response.status(HttpStatusCode.OK).json(getRoles);
});

export default securityController;
