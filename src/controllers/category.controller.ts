import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import CategoryDto from "../dtos/category.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";
import QhatuRole from "../enums/role.enum";
import { accessControlMiddleware } from "../middlewares/auth.middleware";
import CategoryService from "../services/category.service";

const categoryController = express.Router();
const categoryService = new CategoryService();
/** GET ALL **/
categoryController.get("/", async (request: Request, response: Response) => {
  const categories = await categoryService.getAll();
  response.status(HttpStatusCode.OK).json(categories);
});
/** GET BY ID **/
categoryController.get(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  accessControlMiddleware(QhatuRole.Admin, QhatuRole.Sales),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      console.log(request.user);
      const { categoryId } = request.params;
      const category = await categoryService.getById(categoryId);
      response.status(HttpStatusCode.OK).json(category);
    } catch (error: any) {
      next(error);
    }
  }
);

/**
 * POST CATEGORY
 * @openapi
 * /category:
 *      post:
 *        tags:
 *          - category
 *        summaty: "Get all categories"
 *        requestBody:
 *          content:
 *            application/json:
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - ffofofof: []
 */
categoryController.post("/", async (request: Request, response: Response) => {
  const categoryToCreate: CategoryDto = request.body;
  const category = await categoryService.add(categoryToCreate);
  response.status(HttpStatusCode.CREATED).json(category);
});
/** UPDATE ALL **/
categoryController.put(
  "/:categoryId",
  async (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const categoryToUpdate = request.body;
    const category = await categoryService.update(categoryId, categoryToUpdate);
    response.status(HttpStatusCode.CREATED).json(category);
  }
);
/** REMOVE **/
categoryController.delete(
  "/:categoryId",
  async (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const category = await categoryService.remove(categoryId);
    response.status(HttpStatusCode.OK).json(category);
  }
);

export default categoryController;
