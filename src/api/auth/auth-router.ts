import { loginValidation, registerValidation } from './auth-validation.js';
import express from 'express';
import {
  loginUserController,
  registerUserController,
} from './auth-controller.js';
import { validate } from 'express-validation';

const router = express.Router();

router
  .route('/register')
  .post(validate(registerValidation), registerUserController);
router.route('/login').post(validate(loginValidation), loginUserController);

export default router;
