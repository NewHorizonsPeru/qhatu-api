import Joi from "joi";

/**
 *   
  id?: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  imageUrl: string; 
 *
 * **/

const id = Joi.string().uuid();
const name = Joi.string().min(15).max(150);
const description = Joi.string().min(50).max(500);
const price = Joi.number().integer().min(1);
const sku = Joi.string().min(6).max(9);
const imageUrl = Joi.string();
const category = Joi.string();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  sku: sku.required(),
  imageUrl: imageUrl.required(),
  category: category.required(),
});

export { createProductSchema };
