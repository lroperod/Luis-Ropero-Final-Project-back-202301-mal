import { Request, Response, NextFunction } from 'express';
import { Travel, TravelModel } from './travel-schema';
import {
  createTravelController,
  getAllTravelsController,
} from './travel-controller';

describe('Given a createTravelController function from travelController', () => {
  const next = jest.fn();
  const mockRequest = {
    body: {
      continent: 'Asia',
      riskFactorUser: {
        stayingRuralArea: true,
        chronicRespiratoryDisease: true,
        intentionHaveChildren: true,
        eggOrChickenProteinAllergy: true,
      },
      travelCreator: 'Pedro',
      travelImage: 'image.png',
    },
  } as Partial<Request>;

  const mockResponse = {
    locals: {
      travelData: {
        continent: 'Asia',
        riskFactorUser: {
          stayingRuralArea: true,
          chronicRespiratoryDisease: true,
          intentionHaveChildren: true,
          eggOrChickenProteinAllergy: true,
        },
        travelCreator: 'Pedro',
        travelImage: 'image.png',
      },
    },

    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  TravelModel.create = jest.fn().mockResolvedValue(mockResponse);

  test('When the database response is successfull it, then it should respond with a message', async () => {
    await createTravelController(
      mockRequest as Request<
        unknown,
        Travel,
        Travel,
        unknown,
        { travelData: Travel; picture: string; email: string }
      >,
      mockResponse as Response<
        Travel,
        {
          travelData: Travel;
          picture: string;
          email: string;
        }
      >,
      next as NextFunction,
    );

    await expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});

describe('Given a getAllTravelsController function from travelController', () => {
  const next = jest.fn();

  const request = {} as Request;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const foundTravels = [
    {
      continent: 'Asia',
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
      exec: jest.fn().mockResolvedValue(foundTravels),
    }));
    await getAllTravelsController(
      request as Request,
      response as Response,
      next as NextFunction,
    );

    expect(response.json).toHaveBeenCalledWith({ travels: foundTravels });
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
