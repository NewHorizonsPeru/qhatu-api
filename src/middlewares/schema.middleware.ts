import { Response, NextFunction } from "express";
import boom from "@hapi/boom";

const schemaMiddleware = (schema: any, property: any) => {
  return (request: any, response: Response, next: NextFunction) => {
    const dataRequest = request[property];
    const { error } = schema.validate(dataRequest, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
};

export { schemaMiddleware };
