import express, { Express } from "express";
import passport from "passport";
import categoryController from "../controllers/category.controller";
import productController from "../controllers/product.controller";
import securityController from "../controllers/security.controller";
import userController from "../controllers/user.controller";

const registerRoutes = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use(
    "/product",
    passport.authenticate("jwt", { session: false }),
    productController
  );
  router.use(
    "/category",
    passport.authenticate("jwt", { session: false }),
    categoryController
  );
  router.use(
    "/user",
    passport.authenticate("jwt", { session: false }),
    userController
  );
  router.use("/security", securityController);
};

export default registerRoutes;
