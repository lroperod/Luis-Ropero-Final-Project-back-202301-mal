import { Travel, TravelVaccines } from './../travels/travel-schema.js';
import { RequestHandler } from 'express';
import { CustomHTTPError } from '../../utils/errors/custom-http-error.js';

export const vaccinesMiddleware: RequestHandler = (req, res, next) => {
  const travelData: TravelVaccines = req.body;

  const finalTravelData: Travel = {
    userAssociatedVaccines: [],
    travelAssociatedVaccines: [],
    travelCreator: req.body.travelCreator,
    travelImage: req.body.travelImage,
    continent: req.body.continent,
    userName: req.body.userName,
  };

  switch (travelData.continent) {
    case 'Asia':
      finalTravelData.travelAssociatedVaccines = [
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
      ];
      break;

    case 'Africa':
      finalTravelData.travelAssociatedVaccines = [
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
      ];
      break;

    case 'America':
      finalTravelData.travelAssociatedVaccines = [
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
      ];
      break;
    default:
      next(new CustomHTTPError(400, 'the selected continent is incorrect'));
  }

  if (travelData.chronicRespiratoryDisease === 'true') {
    finalTravelData.userAssociatedVaccines.push({
      nameVaccines: 'Neumococo',
      stateVaccines: false,
    });
  }

  if (travelData.stayingRuralArea === 'true') {
    finalTravelData.userAssociatedVaccines.push({
      nameVaccines: 'Colera',
      stateVaccines: false,
    });
  }

  if (travelData.intentionHaveChildren === 'true') {
    finalTravelData.userAssociatedVaccines.push({
      nameVaccines: 'Tosferina dTDA',
      stateVaccines: false,
    });
  }

  if (travelData.eggOrChickenProteinAllergy === 'true') {
    finalTravelData.userAssociatedVaccines.push({
      nameVaccines: 'Gripe',
      stateVaccines: false,
    });
  }

  res.locals.travelData = finalTravelData;
  next();
};
