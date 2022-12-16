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
const name = Joi.string().alphanum().min(15).max(150);
const description = Joi.string().alphanum().min(50).max(500);
const price = Joi.number().integer().min(1);
const sku = Joi.string().alphanum().min(6).max(9);
const imageUrl = Joi.string().dataUri();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  sku: sku.required(),
  imageUrl: imageUrl.required(),
});

export { createProductSchema };
