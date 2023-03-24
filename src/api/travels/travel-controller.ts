import { RequestHandler } from 'express';
import { Travel, TravelModel } from './travel-schema.js';

const queryProjection = { __v: 0 };

export const createTravelController: RequestHandler<
  unknown,
  Travel,
  Travel,
  unknown,
  { travelData: Travel }
> = async (_req, res) => {
  const travelFormData = res.locals.travelData;

  await TravelModel.create(travelFormData);
  res.status(201).json(travelFormData);
};

export const getAllTravelsController: RequestHandler<
  unknown,
  Travel[]
> = async (_req, res, next) => {
  try {
    const foundTravels = await TravelModel.find({}, queryProjection).exec();
    res.json(foundTravels);
  } catch (error) {
    next(error);
  }
};
