import { NextFunction, Response } from "express";
import boom from "@hapi/boom";

const roleAdminMiddleware = (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const { user } = request;
  if (user.role === "ADMIN") {
    next();
  } else {
    next(boom.unauthorized("User hasn't priviligies necesaries."));
  }
};

const accessControlMiddleware = (...roles: any[]) => {
  return (request: any, response: Response, next: NextFunction) => {
    const { user } = request;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized("User hasn't priviligies necesaries."));
    }
  };
};

export { accessControlMiddleware };
