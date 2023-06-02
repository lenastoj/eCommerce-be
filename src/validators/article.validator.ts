import { body } from 'express-validator';

const articleVlidator = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be sting')
    .notEmpty()
    .withMessage('Name can not be empty')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be sting')
    .notEmpty()
    .withMessage('Description can not be empty')
    .isLength({ min: 2 })
    .withMessage('Description must be at least 2 characters'),

  body('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Image URL is required')
    .isString()
    .withMessage('Image URL must be sting')
    .notEmpty()
    .withMessage('Image URL can not be empty')
    .isURL()
    .withMessage('Image URL must be a valid URL'),

  body('colors')
    .exists({ checkFalsy: true })
    .withMessage('Colors are required')
    .notEmpty()
    .withMessage('Colors can not be empty')
    .isArray({ min: 1 })
    .withMessage('Colors must have at least one color')
    .custom((value) => {
      if (!value.every((color) => typeof color === 'string')) {
        throw new Error('colors must be an array of strings');
      }
      return true;
    }),

  body('sizes')
    .exists({ checkFalsy: true })
    .withMessage('Size is required')
    .notEmpty()
    .withMessage('Size can not be empty')
    .isArray({ min: 1 })
    .withMessage('Must have at least one size')
    .isFloat({ min: 36, max: 50 })
    .withMessage('Sizes in EU go from 36 to 50')
    .custom((value) => {
      if (!value.every((size) => typeof size === 'number')) {
        throw new Error('Size must be an array of numbers');
      }
      return true;
    }),

  body('price')
    .exists({ checkFalsy: true })
    .withMessage('Price is required')
    .notEmpty()
    .withMessage('Price can not be empty')
    .isFloat()
    .withMessage('Price must be a number'),

  body('inStock')
    .exists({ checkFalsy: true })
    .withMessage('In stock is required')
    .notEmpty()
    .withMessage('In stock can not be empty')
    .isBoolean()
    .withMessage('In stock must be a boolean'),

  body('gender')
    .exists({ checkFalsy: true })
    .withMessage('Gender is required')
    .notEmpty()
    .withMessage('Gender can not be empty')
    .isString()
    .withMessage('Gender must be string')
    .isIn(['man', 'woman'])
    .withMessage('Gender must be "man" or "woman"'),
];

export default articleVlidator;
