import boom from "@hapi/boom";

import ProductModel from "../models/product.model";
import ProductDto from "../dtos/product.dto";
import ProductRepository from "../repositories/product.repository";

class ProductService {
  private readonly productRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAll(): Promise<ProductDto[]> {
    let productsDto: ProductDto[] = [];
    const productsModel = await this.productRepository.getAll();
    productsModel.map((p) =>
      productsDto.push({
        id: p.id,
        name: p.name!,
        description: p.description!,
        price: p.price!,
        sku: p.code!,
        imageUrl: p.imageUrl!,
        category: p.category!,
      })
    );
    return productsDto;
  }
  async getById(productId: string): Promise<ProductDto> {
    const productModel = await this.productRepository.getById(productId);
    if (!productModel) {
      throw boom.notFound("Product not found 😔");
    }
    if (productModel.price! === 0) {
      throw boom.conflict("Product with price zero 😱");
    }
    const productDto: ProductDto = {
      id: productModel.id,
      name: productModel.name!,
      description: productModel.description!,
      price: productModel.price!,
      sku: productModel.code!,
      imageUrl: productModel.imageUrl!,
      category: productModel.category!,
    };
    return productDto;
  }
  async add(productDtoToAdd: ProductDto): Promise<ProductDto> {
    const productModel = new ProductModel({
      name: productDtoToAdd.name,
      description: productDtoToAdd.description,
      price: productDtoToAdd.price,
      code: productDtoToAdd.sku,
      imageUrl: productDtoToAdd.imageUrl,
      category: productDtoToAdd.category,
    });
    const newProductModel = await this.productRepository.add(productModel);
    productDtoToAdd.id = newProductModel.id;
    return productDtoToAdd;
  }
  async update(
    productId: string,
    productDtoToUpdate: ProductDto
  ): Promise<ProductDto> {
    const productModel = await this.productRepository.update(
      productDtoToUpdate,
      productId
    );
    const productDto: ProductDto = {
      id: productModel?.id,
      name: productModel?.name!,
      description: productModel?.description!,
      price: productModel?.price!,
      sku: productModel?.code!,
      imageUrl: productModel?.imageUrl!,
      category: productModel?.category!,
    };
    return productDto;
  }
  async remove(productId: string): Promise<ProductDto> {
    const productModel = await this.productRepository.remove(productId);
    let productDto: ProductDto = {
      id: productModel?.id,
      category: productModel?.category!,
      description: productModel?.description!,
      imageUrl: productModel?.imageUrl!,
      name: productModel?.name!,
      price: productModel?.price!,
      sku: productModel?.code!,
    };
    return productDto;
  }
}

export default ProductService;
