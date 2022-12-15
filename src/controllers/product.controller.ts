import express, { Request, Response } from "express";
import ProductDto from "../dtos/product.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";
import ProductService from "../services/product.service";

const productController = express.Router();
const productService = new ProductService();
/** GET ALL **/
productController.get("/", (request: Request, response: Response) => {
  const products: ProductDto[] = productService.getAll();
  response.status(HttpStatusCode.OK).json(products);
});
/** GET BY ID **/
productController.get("/:productId", (request: Request, response: Response) => {
  const { productId } = request.params;
  const product = productService.getById(productId);
  response.status(HttpStatusCode.OK).json(product);
});
/** CREATE **/
productController.post("/", (request: Request, response: Response) => {
  const productToCreate: ProductDto = request.body;
  const product = productService.add(productToCreate);
  response.status(HttpStatusCode.CREATED).json(product);
});
/** UPDATE ALL **/
productController.put("/:productId", (request: Request, response: Response) => {
  const { productId } = request.params;
  const productToUpdate = request.body;
  const product = productService.update(productId, productToUpdate);
  response.status(HttpStatusCode.CREATED).json(product);
});
/** UPDATE PARTIAL **/
productController.patch(
  "/:productId",
  (request: Request, response: Response) => {
    const { productId } = request.params;
    const productToUpdate = request.body;
    const product = productService.update(productId, productToUpdate);
    response.status(HttpStatusCode.CREATED).json(product);
  }
);
/** REMOVE **/
productController.delete(
  "/:productId",
  (request: Request, response: Response) => {
    const { productId } = request.params;
    const product = productService.remove(productId);
    response.status(HttpStatusCode.OK).json(product);
  }
);

export default productController;
