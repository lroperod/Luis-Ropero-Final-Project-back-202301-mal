import express from 'express';
import {
  createTravelController,
  deleteTravelByIdController,
  getAllTravelsController,
  getTravelByIdController,
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

travelRouter.route('/user/:userEmail').get(getTravelsByEmailCreatorController);
travelRouter
  .route('/:id')
  .delete(deleteTravelByIdController)
  .get(getTravelByIdController);
