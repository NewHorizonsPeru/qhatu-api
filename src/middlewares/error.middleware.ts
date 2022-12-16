import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../enums/httpstatuscode.enum";

const logErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(error.message);
  next(error);
};

const boomErrorMiddleware = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.isBoom) {
    const { output } = error;
    response.status(output.statusCode).json(output.payload);
  }
  next(error);
};

const jsonErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    code: HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: error.message,
    stack: error.stack,
  });
};

export { logErrorMiddleware, jsonErrorMiddleware, boomErrorMiddleware };
