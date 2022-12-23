import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import CategoryDto from "../dtos/category.dto";
import HttpStatusCode from "../enums/httpstatuscode.enum";
import CategoryService from "../services/category.service";

const categoryController = express.Router();
const categoryService = new CategoryService();
/** GET ALL
 * @swagger
 * /category:
 *   get:
 *     description: Returns Categories
 *     tags:
 *      - Categories
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Category
 *
 */
categoryController.get("/", async (request: Request, response: Response) => {
  const categories = await categoryService.getAll();
  response.status(HttpStatusCode.OK).json(categories);
});
/** GET BY ID
 * @swagger
 * /category/{categoryId}:
 *   get:
 *     description: Returns Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: Numeric ID of the category to retrieve.
 *         schema:
 *           type: string
 *     tags:
 *      - Categories
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Category
 *
 */
categoryController.get(
  "/:categoryId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
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
 * @swagger
 * /cateogry:
 *   post:
 *     tags:
 *      - Categories
 *     summary: Create a category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The categorie's name.
 *                 example: Tecnologia
 *     responses:
 *       201:
 */
categoryController.post("/", async (request: Request, response: Response) => {
  const categoryToCreate: CategoryDto = request.body;
  const category = await categoryService.add(categoryToCreate);
  const modelCategory = response.status(HttpStatusCode.CREATED).json(category);
});
/** UPDATE ALL
/**
 * POST CATEGORY
 * @swagger
 * /cateogry/{categoryId}:
 *   put:
 *     tags:
 *      - Categories
 *     summary: Create a category.
 *     parameters:
 *      - in: path
 *        name: categoryId
 *        required: true
 *        description: Numeric ID of the category to retrieve.
 *        schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The categorie's name.
 *                 example: Tecnologia
 *     responses:
 *       201:
 */
categoryController.put(
  "/:categoryId",
  async (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const categoryToUpdate = request.body;
    const category = await categoryService.update(categoryId, categoryToUpdate);
    response.status(HttpStatusCode.CREATED).json(category);
  }
);
/** REMOVE
/** GET BY ID
 * @swagger
 * /category/{categoryId}:
 *   delete:
 *     description: Returns Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: Numeric ID of the category to retrieve.
 *         schema:
 *           type: string
 *     tags:
 *      - Categories
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Category
 *
 */
categoryController.delete(
  "/:categoryId",
  async (request: Request, response: Response) => {
    const { categoryId } = request.params;
    const category = await categoryService.remove(categoryId);
    response.status(HttpStatusCode.OK).json(category);
  }
);

export default categoryController;
