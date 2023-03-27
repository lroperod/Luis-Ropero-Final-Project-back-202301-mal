import { vaccinesMiddleware } from './vaccines-middleware';
import { Request, Response, NextFunction } from 'express';
import { Travel } from '../travels/travel-schema';

describe('Given a vaccinesMiddleware', () => {
  const req = {
    body: {
      continent: 'Asia',
      userName: 'Antonio',
      travelCreator: 'id12345',
      travelImage: 'https://example.com/image.jpg',
      riskFactorUser: {
        chronicRespiratoryDisease: true,
        stayingRuralArea: true,
        intentionHaveChildren: true,
        eggOrChickenProteinAllergy: true,
      },
    },
  } as Request;
  const resp = {
    locals: {},
  } as Response;
  const next = jest.fn() as NextFunction;

  test('should set the travel data with the corresponding vaccines for Asia continent', () => {
    req.body.continent = 'Asia';

    vaccinesMiddleware(req, resp, next);

    const expectedTravelData: Travel = {
      continent: 'Asia',
      userName: 'Antonio',
      userAssociatedVaccines: [
        {
          nameVaccines: 'Neumococo',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Colera',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Tosferina dTDA',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Gripe',
          stateVaccines: false,
        },
      ],
      travelAssociatedVaccines: [
        {
          nameVaccines: 'Encefalitis Japonesa',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Fiebre Tifoidea',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Hepatitis A',
          stateVaccines: false,
        },
      ],
      travelCreator: 'id12345',
      travelImage: 'https://example.com/image.jpg',
    };

    expect(resp.locals.travelData).toStrictEqual(expectedTravelData);
    expect(next).toHaveBeenCalledTimes(1);
  });
  test('should set the travel data with the corresponding vaccines for Africa continent', () => {
    req.body.continent = 'Africa';

    vaccinesMiddleware(req, resp, next);

    const expectedTravelData: Travel = {
      continent: 'Africa',
      userName: 'Antonio',
      userAssociatedVaccines: [
        {
          nameVaccines: 'Neumococo',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Colera',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Tosferina dTDA',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Gripe',
          stateVaccines: false,
        },
      ],
      travelAssociatedVaccines: [
        {
          nameVaccines: 'Meningitis Acwy',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Poliomielitis',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Hepatitis A',
          stateVaccines: false,
        },
      ],
      travelCreator: 'id12345',
      travelImage: 'https://example.com/image.jpg',
    };

    expect(resp.locals.travelData).toStrictEqual(expectedTravelData);
    expect(next).toHaveBeenCalledTimes(2);
  });
  test('should set the travel data with the corresponding vaccines for America continent', () => {
    req.body.continent = 'America';

    vaccinesMiddleware(req, resp, next);

    const expectedTravelData: Travel = {
      continent: 'America',
      userName: 'Antonio',
      userAssociatedVaccines: [
        {
          nameVaccines: 'Neumococo',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Colera',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Tosferina dTDA',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Gripe',
          stateVaccines: false,
        },
      ],
      travelAssociatedVaccines: [
        {
          nameVaccines: 'Fiebre amarilla',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Rabia',
          stateVaccines: false,
        },
        {
          nameVaccines: 'Hepatitis A',
          stateVaccines: false,
        },
      ],
      travelCreator: 'id12345',
      travelImage: 'https://example.com/image.jpg',
    };

    expect(resp.locals.travelData).toStrictEqual(expectedTravelData);
    expect(next).toHaveBeenCalledTimes(3);
  });
  test('does not add travel-associated vaccines if the continent is unknown', () => {
    req.body.continent = 'Unknown';
    vaccinesMiddleware(req, resp, next);

    expect(resp.locals.travelData.travelAssociatedVaccines).toEqual([]);
  });
});
