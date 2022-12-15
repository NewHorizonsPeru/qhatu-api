import express, { Express } from "express";
import productController from "../controllers/product.controller";

const registerRoutes = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/product", productController);
  router.use("/category", productController);
  router.use("/user", productController);
};

export default registerRoutes;
