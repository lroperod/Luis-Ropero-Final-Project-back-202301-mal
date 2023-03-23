import express from 'express';
import {
  createTravelController,
  getAllTravelsController,
} from './travel-controller.js';

export const travelRouter = express.Router();

travelRouter
  .route('/')
  .post(createTravelController)
  .get(getAllTravelsController);
