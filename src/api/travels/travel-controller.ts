import { RequestHandler } from 'express';
import { Travel, TravelModel } from './travel-schema.js';

export const createTravelController: RequestHandler<
  unknown,
  Travel | { msg: string },
  Travel
> = async (req, resp) => {
  const travel: Travel = {
    ...req.body,
  };

  await TravelModel.create(travel);
  resp.status(201).json({ msg: 'Your trip has been successfully created' });
};

const queryProjection = { __v: 0 };

export const getAllTravelsController: RequestHandler<
  unknown,
  Travel[] | { msg: string }
> = async (_req, res, next) => {
  try {
    const foundTravels = await TravelModel.find({}, queryProjection).exec();
    res.json(foundTravels);
  } catch (error) {
    next(error);
  }
};
