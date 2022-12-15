import ProductDto from "../dtos/product.dto";

class ProductService {
  constructor() {}
  getAll(): ProductDto[] {
    return [];
  }
  add(product: ProductDto) {}
  getById(id: string): ProductDto {
    return { id: "131X22", name: "HIDROLAVADORA KATCHER" };
  }
  update(id: string, product: ProductDto): ProductDto {
    return { id: "131X22", name: "HIDROLAVADORA KATCHER" };
  }
  remove(id: string): ProductDto {
    return { id: "131X22", name: "HIDROLAVADORA KATCHER" };
  }
}

export default ProductService;
