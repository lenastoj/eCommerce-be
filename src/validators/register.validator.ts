import User from '@models/user.model';
import { body } from 'express-validator';

const registerValidator = [
  body('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be sting')
    .notEmpty()
    .withMessage('First name can not be empty')
    .isLength({min: 2})
    .withMessage('First name must be at least 2 characters'),

  body('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be sting')
    .notEmpty()
    .withMessage('Last name can not be empty')
    .isLength({min: 2})
    .withMessage('Last name must be at least 2 characters'),

  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .notEmpty()
    .withMessage('Email can not be empty')
    .isEmail()
    .withMessage({ message: 'Email format is incorrect' })
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (user) throw new Error('Email already taken');
      
      return true;
    }),

  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be sting')
    .notEmpty()
    .withMessage('Password can not be empty')
    .isLength({ min: 5, max: 15 })
    .withMessage("Password should have length between 5-15")
    .matches(/\d/)
    .withMessage("Password should have at least one number"),


  body('passwordConfirmation')
    .exists({ checkFalsy: true })
    .withMessage('Password confirmation is required')
    .custom((value, {req}) => {
        const password = req.body.password;
        if(value !== password) throw new Error('Passwords do not match');
        return true;
    }),
];

export default registerValidator;
