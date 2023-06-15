import { body } from 'express-validator';

const searchValidator = [
  body('searchParams')
    .optional()
    .isString()
    .withMessage('Search params must be string'),
];

export default searchValidator;
