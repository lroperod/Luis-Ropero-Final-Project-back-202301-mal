import express from 'express';
import {
  createTravelController,
  getAllTravelsController,
  getTravelsByEmailCreatorController,
} from './travel-controller.js';

import { vaccinesMiddleware } from '../vaccines/vaccines-middleware.js';
import { supabaseMiddleware } from './supabase-middleware.js';
import { upload } from './image-upload-middleware.js';
import { validate } from 'express-validation';
import { createTravelValidation } from '../auth/auth-validation.js';

export const travelRouter = express.Router();
travelRouter
  .route('/')
  .post(
    upload.single('travelUpload'),
    vaccinesMiddleware,
    supabaseMiddleware,
    validate(createTravelValidation),
    createTravelController,
  )
  .get(getAllTravelsController);

travelRouter.route('/:userEmail').get(getTravelsByEmailCreatorController);
