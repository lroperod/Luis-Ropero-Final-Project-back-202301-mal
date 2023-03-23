import { Request, Response, NextFunction } from 'express';
import { Travel, TravelModel } from './travel-schema';
import {
  createTravelController,
  getAllTravelsController,
} from './travel-controller';

describe('Given a createTravelController function from travelController', () => {
  const next = jest.fn();

  const request = {
    country: 'India',
    userAssociatedVaccines: {
      nameVaccines: 'Colera',
      stateVaccines: 'true',
    },
    travelAssociatedVaccines: {
      nameVaccines: 'fiebre amarilla',
      stateVaccines: 'true',
    },
    travelCreator: 'Antonio',
  } as Partial<Request>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response<Travel | { msg: string }>>;

  TravelModel.create = jest.fn().mockResolvedValue(response);

  test('When the database response is successfull it, then it should respond with a message', async () => {
    await createTravelController(
      request as Request,
      response as Response,
      next as NextFunction,
    );

    await expect(response.status).toHaveBeenCalledWith(201);
  });
});

describe('Given a getAllTravelsController function from travelController', () => {
  const next = jest.fn();

  const request = {} as Request;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response<Travel | { msg: string }>>;

  const foundTravel = [
    {
      country: 'India',
      userAssociatedVaccines: {
        nameVaccines: 'Colera',
        stateVaccines: 'true',
      },
      travelAssociatedVaccines: {
        nameVaccines: 'fiebre amarilla',
        stateVaccines: 'true',
      },
      travelCreator: 'Antonio',
      travelImage: 'url',
    },
  ];

  test('When the database response is successfull it, then it should respond with a list of travels', async () => {
    TravelModel.find = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue([{ foundTravel }]),
    }));
    await getAllTravelsController(
      request as Request,
      response as Response,
      next as NextFunction,
    );

    expect(response.json).toHaveBeenCalledWith([{ foundTravel }]);
  });

  test('When the database trows an error, it must be handled by the errorhandler', async () => {
    TravelModel.find = jest.fn().mockReturnValue(() => ({
      exec: jest
        .fn()
        .mockResolvedValue({ exec: jest.fn().mockResolvedValue(null) }),
    }));
    await getAllTravelsController(
      request as Request,
      response as Response,
      next as NextFunction,
    );

    expect(next).toHaveBeenCalled();
  });
});
