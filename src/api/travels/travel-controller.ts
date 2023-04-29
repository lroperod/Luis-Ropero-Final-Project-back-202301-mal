import { RequestHandler } from 'express';
import { Travel, TravelModel } from './travel-schema.js';
import { CustomHTTPError } from '../../utils/errors/custom-http-error.js';
import { UserModel } from '../users/user-schema.js';
import {
  supabase,
  TRAVEL_BUCKET_NAME,
} from '../../database/supabase-client.js';

const queryProjection = { __v: 0, subjects: 0 };

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
    const travel = await TravelModel.find(
      {
        travelCreator: userEmail,
      },
      queryProjection,
    ).exec();

    if (travel === null) {
      throw new CustomHTTPError(404, 'This travel does not exist');
    }

    res.json({ travels: travel });
  } catch (error) {
    next(error);
  }
};

export const getTravelByIdController: RequestHandler<
  { id: string },
  { travels: Travel }
> = async (req, res, next) => {
  const { id } = req.params;

  const travel = await TravelModel.findById(id, queryProjection).exec();
  if (travel === null) {
    return next(new CustomHTTPError(404, 'The travel does not exist'));
  }

  res.json({ travels: travel });
};

export const deleteTravelByIdController: RequestHandler<{
  id: string;
}> = async (req, res, next) => {
  const { id } = req.params;

  const travel = await TravelModel.findByIdAndDelete({ _id: id }).exec();

  if (travel !== undefined && travel !== null) {
    const file = travel.travelImage.substring(
      travel.travelImage.lastIndexOf('/') + 1,
    );
    await supabase.storage.from(TRAVEL_BUCKET_NAME).remove([file]);
  }

  if (travel === null) {
    return next(new CustomHTTPError(404, 'The travel does not exist'));
  }

  return res.status(200).json({ msg: 'The travel has been deleted' });
};
