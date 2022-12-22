import ProductModel from "../models/product.model";

export default class ProductRepository {
  async getAll() {
    const products = await ProductModel.find();
    return products;
  }
  async getById(productId: string) {
    const product = await ProductModel.findById(productId);
    return product;
  }
  async add(productModelToAdd: any) {
    const productModel = await productModelToAdd.save();
    return productModel;
  }
  async update(productoModelToUpdate: any, productId: string) {
    const productModel = await ProductModel.findByIdAndUpdate(
      productId,
      productoModelToUpdate,
      { new: true }
    );
    return productModel;
  }
  async remove(productId: string) {
    const productRemove = await ProductModel.findByIdAndDelete(productId);
    return productId;
  }
}
