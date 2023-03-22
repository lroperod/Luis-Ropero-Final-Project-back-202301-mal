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
