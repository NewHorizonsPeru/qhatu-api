import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";

const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const secretValue = request.headers["secret-value"];
  console.log(request.headers);
  if (secretValue === process.env.SECRET_KEY) {
    next();
  } else {
    next(boom.unauthorized("401 - UNAUTHORIZED"));
  }
};

export { authMiddleware };
