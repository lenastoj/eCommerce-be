import { body } from 'express-validator';

const loginValidator = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .notEmpty()
    .withMessage('Email can not be empty')
    .isEmail()
    .withMessage('Email format is incorrect'),
    
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be sting')
    .notEmpty()
    .withMessage('Password can not be empty'),
];

export default loginValidator;
