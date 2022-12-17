import express, { Express } from "express";
import categoryController from "../controllers/category.controller";
import productController from "../controllers/product.controller";
import securityController from "../controllers/security.controller";
import userController from "../controllers/user.controller";

const registerRoutes = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/product", productController);
  router.use("/category", categoryController);
  router.use("/user", userController);
  router.use("/security", securityController);
};

export default registerRoutes;
