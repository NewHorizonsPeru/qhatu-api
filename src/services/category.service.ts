import boom from "@hapi/boom";
import CategoryDto from "../dtos/category.dto";
import CategoryModel from "../models/category.model";
import CategoryRepository from "../repositories/category.repository";

class CategoryService {
  private readonly categoryRepository;
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getAll(): Promise<CategoryDto[]> {
    let categoriesDto: CategoryDto[] = [];
    const categoriesModel = await this.categoryRepository.getAll();
    categoriesModel.map((c) => categoriesDto.push({ id: c.id, name: c.name! }));
    return categoriesDto;
  }

  async getById(categoryId: string): Promise<CategoryDto> {
    const categoryModel = await this.categoryRepository.getById(categoryId);
    if (!categoryModel) {
      throw boom.notFound("Category not found 😔");
    }
    const categoryDto: CategoryDto = {
      id: categoryModel.id,
      name: categoryModel.name!,
    };
    return categoryDto;
  }
  async add(categoryToAdd: CategoryDto): Promise<CategoryDto> {
    const categoryModel = new CategoryModel({
      name: categoryToAdd.name,
    });
    const categorySave = await this.categoryRepository.add(categoryModel);
    categoryToAdd.id = categorySave.id;
    return categoryToAdd;
  }
  async update(
    categoryId: string,
    categoryToUpdate: CategoryDto
  ): Promise<CategoryDto> {
    const categoryModel = await this.categoryRepository.update(
      categoryToUpdate,
      categoryId
    );
    const categoryDto: CategoryDto = {
      name: categoryModel?.name!,
      id: categoryModel?.id,
    };
    return categoryDto;
  }
  async remove(categoryId: string): Promise<{}> {
    const categoryIdRemoved = await this.categoryRepository.remove(categoryId);
    return { categoryIdRemoved, success: true };
  }
}

export default CategoryService;
