import express, { Request, Response } from "express";
import UserDto from "../dtos/user.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";

const userController = express.Router();

/** GET ALL **/
userController.get("/", (request: Request, response: Response) => {
  const products: UserDto[] = [
    {
      id: "2131",
      mail: "admin@newhorizons.edu.pe",
    },
  ];
  response.status(HttpStatusCode.OK).json(products);
});
/** GET BY ID **/
userController.get("/:userId", (request: Request, response: Response) => {
  const { userId } = request.params;
  if (userId === "2705") {
    response.status(HttpStatusCode.NOT_FOUND).json({
      message: "Product not found.",
    });
  } else {
    response.status(HttpStatusCode.OK).json({
      userId: userId,
      productName: "Leche Evaporada Danlac",
    });
  }
});
/** CREATE **/
userController.post("/", (request: Request, response: Response) => {
  const body = request.body;
  response.status(HttpStatusCode.CREATED).json({
    method: "POST",
    payload: body,
  });
});
/** UPDATE ALL **/
userController.put("/:userId", (request: Request, response: Response) => {
  const { userId } = request.params;
  const payload = { ...request.body, userId };

  response.status(HttpStatusCode.CREATED).json({
    method: "PUT",
    payload: payload,
  });
});
/** UPDATE PARTIAL **/
userController.patch("/:userId", (request: Request, response: Response) => {
  const { userId } = request.params;
  const payload = { ...request.body, userId };

  response.status(HttpStatusCode.CREATED).json({
    method: "PATCH",
    payload: payload,
  });
});
/** REMOVE **/
userController.delete("/:userId", (request: Request, response: Response) => {
  const { userId } = request.params;
  response.status(HttpStatusCode.OK).json({
    method: "DELETE",
    payload: { userId },
  });
});

export default userController;
