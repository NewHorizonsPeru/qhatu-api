import express, { Request, Response } from "express";
import CategoryDto from "../dtos/category.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";

const categoryController = express.Router();

/** GET ALL **/
categoryController.get("/", (request: Request, response: Response) => {
  const categories: CategoryDto[] = [
    {
      id: "2131",
      name: "Product 01",
    },
  ];
  response.status(HttpStatusCode.OK).json(categories);
});
/** GET BY ID **/
categoryController.get(
  "/:categoryId",
  (request: Request, response: Response) => {
    const { categoryId } = request.params;
    if (categoryId === "2705") {
      response.status(HttpStatusCode.NOT_FOUND).json({
        message: "Product not found.",
      });
    } else {
      response.status(HttpStatusCode.OK).json({
        categoryId: categoryId,
        productName: "Leche Evaporada Danlac",
      });
    }
  }
);
/** CREATE **/
categoryController.post("/", (request: Request, response: Response) => {
  const body = request.body;
  response.status(HttpStatusCode.CREATED).json({
    method: "POST",
    payload: body,
  });
});
/** UPDATE ALL **/
categoryController.put(
  "/:categoryId",
  (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const payload = { ...request.body, categoryId };

    response.status(HttpStatusCode.CREATED).json({
      method: "PUT",
      payload: payload,
    });
  }
);
/** UPDATE PARTIAL **/
categoryController.patch(
  "/:categoryId",
  (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const payload = { ...request.body, categoryId };

    response.status(HttpStatusCode.CREATED).json({
      method: "PATCH",
      payload: payload,
    });
  }
);
/** REMOVE **/
categoryController.delete(
  "/:categoryId",
  (request: Request, response: Response) => {
    const { categoryId } = request.params;
    response.status(HttpStatusCode.OK).json({
      method: "DELETE",
      payload: { categoryId },
    });
  }
);

export default categoryController;
