import express, { Request, Response } from "express";

const productController = express.Router();

productController.get("/getAll", (request: Request, response: Response) => {
  response.json([
    {
      productId: 1,
      productName: "Product 01",
    },
    {
      productId: 2,
      productName: "Product 02",
    },
  ]);
});

productController.get("/search", (request: Request, response: Response) => {
  response.send("Products Search");
});

productController.get("/:productId", (request: Request, response: Response) => {
  const { productId } = request.params;
  response.json({
    productId: productId,
    productName: "Leche Evaporada Danlac",
  });
});

productController.post("/", (request: Request, response: Response) => {
  const body = request.body;
  response.json({
    method: "POST",
    payload: body,
  });
});

productController.put("/:productId", (request: Request, response: Response) => {
  const { productId } = request.params;
  const payload = { ...request.body, productId };

  response.json({
    method: "PUT",
    payload: payload,
  });
});

productController.patch(
  "/:productId",
  (request: Request, response: Response) => {
    const { productId } = request.params;
    const payload = { ...request.body, productId };

    response.json({
      method: "PATCH",
      payload: payload,
    });
  }
);

productController.delete(
  "/:productId",
  (request: Request, response: Response) => {
    const { productId } = request.params;
    response.json({
      method: "DELETE",
      payload: { productId },
    });
  }
);

export default productController;
