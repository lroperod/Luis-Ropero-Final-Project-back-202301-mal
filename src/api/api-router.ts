import { travelRouter } from './travels/travel-router.js';
import express from 'express';

const apiRouter = express.Router();

apiRouter.use('/travel', travelRouter);

export default apiRouter;
