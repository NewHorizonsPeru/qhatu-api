import boom from "@hapi/boom";

import ProductDto from "../dtos/product.dto";
import { generateProducts, generateUuid } from "../util/fake.data";

class ProductService {
  products: ProductDto[];
  constructor() {
    this.products = generateProducts();
  }
  getAll(): Promise<ProductDto[]> {
    return new Promise((resolve) => resolve(this.products));
  }
  async getById(productId: string): Promise<ProductDto> {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw boom.notFound("Product not found 😔");
    }
    if (product.price === 0) {
      throw boom.conflict("Product not valid 🥸");
    }
    return product;
  }
  async add(productToAdd: ProductDto): Promise<ProductDto> {
    productToAdd.id = generateUuid();
    this.products.push(productToAdd);
    return productToAdd;
  }
  async update(
    productId: string,
    productToUpdate: ProductDto
  ): Promise<ProductDto> {
    const index = this.products.findIndex((p) => p.id === productId);
    if (index === -1) {
      throw boom.notFound("Product not found 😔");
    }
    const product = this.products[index];
    const productUpdated = {
      ...product,
      ...productToUpdate,
    };
    this.products[index] = productUpdated;

    return productUpdated;
  }
  async remove(productId: string): Promise<{}> {
    const index = this.products.findIndex((p) => p.id === productId);
    if (index === -1) {
      throw new Error("Product not found 😔");
    }
    this.products.splice(index, 1);
    return { productId, success: true };
  }
}

export default ProductService;
