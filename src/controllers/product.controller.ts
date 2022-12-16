import express, { NextFunction, Request, Response } from "express";
import ProductDto from "../dtos/product.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";
import { schemaMiddleware } from "../middlewares/schema.middleware";
import { createProductSchema } from "../schemas/product.schema";
import ProductService from "../services/product.service";

const productController = express.Router();
const productService = new ProductService();
/** GET ALL **/
productController.get("/", async (request: Request, response: Response) => {
  const products = await productService.getAll();
  response.status(HttpStatusCode.OK).json(products);
});
/** GET BY ID **/
productController.get(
  "/:productId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { productId } = request.params;
      const product = await productService.getById(productId);
      response.status(HttpStatusCode.OK).json(product);
    } catch (error: any) {
      next(error);
    }
  }
);
/** CREATE **/
productController.post(
  "/",
  schemaMiddleware(createProductSchema, "body"),
  async (request: Request, response: Response) => {
    const productToCreate: ProductDto = request.body;
    console.log(productToCreate);
    const product = await productService.add(productToCreate);
    response.status(HttpStatusCode.CREATED).json(product);
  }
);
/** UPDATE ALL **/
productController.put(
  "/:productId",
  async (request: Request, response: Response) => {
    const { productId } = request.params;
    const productToUpdate = request.body;
    const product = await productService.update(productId, productToUpdate);
    response.status(HttpStatusCode.CREATED).json(product);
  }
);
/** REMOVE **/
productController.delete(
  "/:productId",
  async (request: Request, response: Response) => {
    const { productId } = request.params;
    const product = await productService.remove(productId);
    response.status(HttpStatusCode.OK).json(product);
  }
);

export default productController;
