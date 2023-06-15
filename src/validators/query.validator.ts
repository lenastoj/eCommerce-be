import Color from '@models/color.model';
import Size from '@models/size.model';
import { query } from 'express-validator';

const queryValidator = [
  query('sort')
    .optional()
    .isIn(['createdAt', 'price'])
    .withMessage('Sort only by price or createdAt'),

  query('orederBy')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Oreder by only ascending or descending'),

  query('size')
    .optional()
    .custom(async (value) => {
      const sizeExists = await Size.findOne({ where: { sizeShoe: value } });
      if(!sizeExists) throw new Error('Size does not exists');
    }),

  query('color')
    .optional()
    .custom(async (value) => {
        const colorExists = await Color.findOne({ where: { name: value } });
        if(!colorExists) throw new Error('Color does not exists');
    }),

  query('gender')
    .optional()
    .isIn(['man', 'woman'])
    .withMessage('Gender only by man or woman'),
];

export default queryValidator;
