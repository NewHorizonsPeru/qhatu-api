import { Express } from "express";
import productController from "../controllers/product.controller";

const registerRoutes = (app: Express) => {
  app.use("/product", productController);
};

export default registerRoutes;
