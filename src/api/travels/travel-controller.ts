import { RequestHandler } from 'express';
import { Travel, TravelModel } from './travel-schema.js';

const queryProjection = { __v: 0 };

export const createTravelController: RequestHandler<
  unknown,
  Travel,
  Travel,
  unknown,
  { travelData: Travel; picture: string; email: string }
> = async (_req, res) => {
  const travelFormData = res.locals.travelData;

  const finalTravel: Travel = {
    ...travelFormData,
    travelImage: res.locals.picture,
  };

  await TravelModel.create(finalTravel);
  res.status(201).json(finalTravel);
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
