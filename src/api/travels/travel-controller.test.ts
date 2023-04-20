import { CustomHTTPError } from './../../utils/errors/custom-http-error';
import { Request, Response, NextFunction } from 'express';
import { Travel, TravelModel } from './travel-schema';
import {
  createTravelController,
  getAllTravelsController,
  getTravelsByEmailCreatorController,
} from './travel-controller';
import { UserModel } from '../users/user-schema';

describe('Given a createTravelController function from travelController', () => {
  const next = jest.fn();
  const mockRequest = {
    body: {
      userName: 'Antonio',
      continent: 'Asia',
      riskFactorUser: {
        stayingRuralArea: true,
        chronicRespiratoryDisease: true,
        intentionHaveChildren: true,
        eggOrChickenProteinAllergy: true,
      },
      travelCreator: 'email',
      travelImage: 'image.png',
    },
  } as Partial<Request>;

  const mockResponse = {
    locals: {
      travelData: {
        userName: 'Antonio',
        continent: 'Asia',
        riskFactorUser: {
          stayingRuralArea: true,
          chronicRespiratoryDisease: true,
          intentionHaveChildren: true,
          eggOrChickenProteinAllergy: true,
        },
        travelCreator: 'email',
        travelImage: 'image.png',
      },
    },

    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  TravelModel.create = jest.fn().mockResolvedValue(mockResponse);
  UserModel.findOne = jest.fn().mockResolvedValue(mockResponse);

  test('When the user tries to create a travel with an image, then it should retun a 201 status', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(1),
    }));
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
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

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

  test('When it tries to search for a creator user and does not find one, then it gives a 404 error', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));
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
    expect(next).toHaveBeenCalledWith(
      new CustomHTTPError(404, 'User is not found'),
    );
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
      userName: 'Antonio',
      userAssociatedVaccines: {
        nameVaccines: 'Colera',
        stateVaccines: 'true',
      },
      travelAssociatedVaccines: {
        nameVaccines: 'fiebre amarilla',
        stateVaccines: 'true',
      },
      travelCreator: 'id12345',
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

describe('Given a  getTravelsByEmailCreatorController function from travelController', () => {
  const travelCreator = '1234';

  const request = {
    params: { userEmail: travelCreator },
  } as Partial<Request<{ userEmail: string }>>;

  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn();

  const travels = {
    continent: 'Asia',
    userName: 'Antonio',
    userAssociatedVaccines: {
      nameVaccines: 'Colera',
      stateVaccines: 'true',
    },
    travelAssociatedVaccines: {
      nameVaccines: 'fiebre amarilla',
      stateVaccines: 'true',
    },
    travelCreator: 'id12345',
    travelImage: 'url',
  };

  test('When the travel exits then it should respond with a travel', async () => {
    TravelModel.find = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(travels),
    }));

    await getTravelsByEmailCreatorController(
      request as Request<{ userEmail: string }>,
      response as Response,
      next,
    );

    expect(response.json).toHaveBeenCalledWith({ travels });
    expect(TravelModel.find).toHaveBeenCalledWith({ travelCreator });
  });

  test('When the travel does not exits then it should return a 404 status', async () => {
    TravelModel.find = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));

    await getTravelsByEmailCreatorController(
      request as Request<{ userEmail: string }>,
      response as Response,
      next,
    );

    expect(next).toHaveBeenCalledWith(
      new CustomHTTPError(404, 'This travel does not exist'),
    );

    expect(TravelModel.find).toHaveBeenCalledWith({ travelCreator });
  });
});
