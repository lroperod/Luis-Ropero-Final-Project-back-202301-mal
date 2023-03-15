import authValidation from './auth-validation.js';
import express from 'express';
import { loginUserController } from './auth-controller.js';
import { validate } from 'express-validation';

const router = express.Router();

router.route('/login').post(validate(authValidation), loginUserController);

export default router;
