import express from 'express';
import {
  createTravelController,
  getAllTravelsController,
} from './travel-controller.js';

import { vaccinesMiddleware } from '../vaccines/vaccines-middleware.js';
import { validate } from 'express-validation';
import { createTravelValidation } from '../auth/auth-validation.js';

export const travelRouter = express.Router();
travelRouter
  .route('/')
  .post(
    vaccinesMiddleware,
    validate(createTravelValidation),
    createTravelController,
  )
  .get(getAllTravelsController);
