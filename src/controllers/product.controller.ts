import express, { Request, Response } from "express";
import ProductDto from "../dtos/product.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";

const productController = express.Router();

/** GET ALL **/
productController.get("/", (request: Request, response: Response) => {
  const products: ProductDto[] = [
    {
      id: "2131",
      name: "Product 01",
    },
  ];
  response.status(HttpStatusCode.OK).json(products);
});
/** GET BY ID **/
productController.get("/:productId", (request: Request, response: Response) => {
  const { productId } = request.params;
  if (productId === "2705") {
    response.status(HttpStatusCode.NOT_FOUND).json({
      message: "Product not found.",
    });
  } else {
    response.status(HttpStatusCode.OK).json({
      productId: productId,
      productName: "Leche Evaporada Danlac",
    });
  }
});
/** CREATE **/
productController.post("/", (request: Request, response: Response) => {
  const body = request.body;
  response.status(HttpStatusCode.CREATED).json({
    method: "POST",
    payload: body,
  });
});
/** UPDATE ALL **/
productController.put("/:productId", (request: Request, response: Response) => {
  const { productId } = request.params;
  const payload = { ...request.body, productId };

  response.status(HttpStatusCode.CREATED).json({
    method: "PUT",
    payload: payload,
  });
});
/** UPDATE PARTIAL **/
productController.patch(
  "/:productId",
  (request: Request, response: Response) => {
    const { productId } = request.params;
    const payload = { ...request.body, productId };

    response.status(HttpStatusCode.CREATED).json({
      method: "PATCH",
      payload: payload,
    });
  }
);
/** REMOVE **/
productController.delete(
  "/:productId",
  (request: Request, response: Response) => {
    const { productId } = request.params;
    response.status(HttpStatusCode.OK).json({
      method: "DELETE",
      payload: { productId },
    });
  }
);

export default productController;
