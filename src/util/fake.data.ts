import { faker } from "@faker-js/faker";

import ProductDto from "../dtos/product.dto";

const generateProducts = (): ProductDto[] => {
  const size = 250;
  let products: ProductDto[] = [];
  for (let index = 0; index < 250; index++) {
    products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      imageUrl: faker.image.imageUrl(),
      sku: faker.phone.imei(),
    });
  }
  return products;
};

const generateUuid = () => {
  return faker.datatype.uuid();
};

export { generateProducts, generateUuid };
