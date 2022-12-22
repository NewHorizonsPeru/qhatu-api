import { Model } from "mongoose";
import CategoryModel from "../models/category.model";

class CategoryRepository {
  constructor() {}
  async getAll() {
    const categories = await CategoryModel.find();
    return categories;
  }
  async getById(cateogryId: string) {
    const category = await CategoryModel.findById(cateogryId);
    console.log(category);
    return category;
  }
  async add(categoryModel: any) {
    const categorySave = await categoryModel.save();
    return categorySave;
  }
  async update(categoryModel: any, categoryId: string) {
    const categoryUpdate = await CategoryModel.findByIdAndUpdate(
      categoryId,
      categoryModel,
      { new: true }
    );
    return categoryUpdate;
  }
  async remove(categoryId: string) {
    const categoryRemove = await CategoryModel.findByIdAndDelete(categoryId);
    return categoryId;
  }
}

export default CategoryRepository;
