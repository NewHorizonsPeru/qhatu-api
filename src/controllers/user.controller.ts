import express, { NextFunction, Request, Response } from "express";
import userDto from "../dtos/user.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";
import UserService from "../services/user.service";

const userController = express.Router();
const userService = new UserService();
/** GET ALL **/
userController.get("/", async (request: Request, response: Response) => {
  const users = await userService.getAll();
  response.status(HttpStatusCode.OK).json(users);
});
/** GET BY ID **/
userController.get(
  "/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { userId } = request.params;
      const user = await userService.getById(userId);
      response.status(HttpStatusCode.OK).json(user);
    } catch (error: any) {
      next(error);
    }
  }
);
/** CREATE **/
userController.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userToCreate: userDto = request.body;
      const user = await userService.add(userToCreate);
      response.status(HttpStatusCode.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }
);
/** UPDATE ALL **/
userController.put("/:userId", async (request: Request, response: Response) => {
  const { userId } = request.params;
  const userToUpdate = request.body;
  const user = await userService.update(userId, userToUpdate);
  response.status(HttpStatusCode.CREATED).json(user);
});
/** REMOVE **/
userController.delete(
  "/:userId",
  async (request: Request, response: Response) => {
    const { userId } = request.params;
    const user = await userService.remove(userId);
    response.status(HttpStatusCode.OK).json(user);
  }
);

export default userController;
