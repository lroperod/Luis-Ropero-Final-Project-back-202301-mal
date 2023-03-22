import express from 'express';
import { createTravelController } from './travel-controller.js';

export const travelRouter = express.Router();

travelRouter.route('/').post(createTravelController);
