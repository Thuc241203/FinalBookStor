import joi from 'joi';
export const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required().min(0),
  images: joi.array(),
  author: joi.string().required(),
  rate: joi.number().required().min(0).max(5),
  sold: joi.number().required().min(0),
  quantityStock: joi.number().required().min(0),
  description: joi.string().required(),
  categoryId: joi.string().required(),
  createdAt: joi.date().default(() => new Date()),
  updatedAt: joi.date().default(() => new Date()),
  deletedAt: joi.date().default(null),
  deleted: joi.boolean().default(false),
})