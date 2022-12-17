import express, { Express } from "express";
import categoryController from "../controllers/category.controller";
import productController from "../controllers/product.controller";

const registerRoutes = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/product", productController);
  router.use("/category", categoryController);
};

export default registerRoutes;
