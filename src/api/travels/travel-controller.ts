import { RequestHandler } from 'express';
import { Travel, TravelModel } from './travel-schema.js';
import { CustomHTTPError } from '../../utils/errors/custom-http-error.js';
import { UserModel } from '../users/user-schema.js';

const queryProjection = { __v: 0 };

export const createTravelController: RequestHandler<
  unknown,
  Travel,
  Travel,
  unknown,
  { travelData: Travel; picture: string; email: string }
> = async (_req, res, next) => {
  const travelFormData = res.locals.travelData;
  const { email } = res.locals;
  const creatorUser = await UserModel.findOne(
    { email },
    { password: 0, __v: 0 },
  ).exec();

  if (creatorUser === null) {
    return next(new CustomHTTPError(404, 'User is not found'));
  }

  const finalTravel: Travel = {
    ...travelFormData,
    travelImage: res.locals.picture,
    travelCreator: creatorUser.email,
  };

  await TravelModel.create(finalTravel);
  res.status(201).json(finalTravel);
};

export const getAllTravelsController: RequestHandler<
  unknown,
  { travels: Travel[] }
> = async (_req, res, next) => {
  try {
    const foundTravels = await TravelModel.find({}, queryProjection).exec();
    res.json({ travels: foundTravels });
  } catch (error) {
    next(error);
  }
};

export const getTravelsByEmailCreatorController: RequestHandler<
  { userEmail: string },
  { travels: Travel[] }
> = async (req, res, next) => {
  const { userEmail } = req.params;

  try {
    const travel = await TravelModel.find({
      travelCreator: userEmail,
    }).exec();

    if (travel === null) {
      throw new CustomHTTPError(404, 'This travel does not exist');
    }

    res.json({ travels: travel });
  } catch (error) {
    next(error);
  }
};
