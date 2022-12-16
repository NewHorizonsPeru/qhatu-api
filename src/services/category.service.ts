import boom from "@hapi/boom";
import CategoryDto from "../dtos/category.dto";

import { generateCategories, generateUuid } from "../util/fake.data";

class CategoryService {
  categories: CategoryDto[];
  constructor() {
    this.categories = generateCategories();
  }
  getAll(): Promise<CategoryDto[]> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(this.categories);
      }, 5000)
    );
  }
  async getById(categoryId: string): Promise<CategoryDto> {
    const category = this.categories.find((p) => p.id === categoryId);
    if (!category) {
      throw boom.notFound("Category not found 😔");
    }

    return category;
  }
  async add(categoryToAdd: CategoryDto): Promise<CategoryDto> {
    categoryToAdd.id = generateUuid();
    this.categories.push(categoryToAdd);
    return categoryToAdd;
  }
  async update(
    categoryId: string,
    categoryToUpdate: CategoryDto
  ): Promise<CategoryDto> {
    const index = this.categories.findIndex((p) => p.id === categoryId);
    if (index === -1) {
      throw boom.notFound("Category not found 😔");
    }
    const category = this.categories[index];
    const categoryUpdated = {
      ...category,
      ...categoryToUpdate,
    };
    this.categories[index] = categoryUpdated;

    return categoryUpdated;
  }
  async remove(categoryId: string): Promise<{}> {
    const index = this.categories.findIndex((p) => p.id === categoryId);
    if (index === -1) {
      throw new Error("Category not found 😔");
    }
    this.categories.splice(index, 1);
    return { categoryId, success: true };
  }
}

export default CategoryService;
