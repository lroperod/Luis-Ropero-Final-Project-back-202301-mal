import { Travel, TravelVaccines } from './../travels/travel-schema.js';
import { RequestHandler } from 'express';

export const vaccinesMiddleware: RequestHandler = (req, res, next) => {
  const travelData: TravelVaccines = req.body;
  const finalTravelData: Travel = {
    userAssociatedVaccines: [],
    travelAssociatedVaccines: [],
    travelCreator: req.body.travelCreator,
    travelImage: req.body.travelImage,
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
      break;
  }

  if (travelData.riskFactorUser.chronicRespiratoryDisease) {
    finalTravelData.userAssociatedVaccines.push({
      nameVaccines: 'Neumococo',
      stateVaccines: false,
    });
  }

  if (travelData.riskFactorUser.stayingRuralArea) {
    finalTravelData.userAssociatedVaccines.push({
      nameVaccines: 'Colera',
      stateVaccines: false,
    });
  }

  if (travelData.riskFactorUser.intentionHaveChildren) {
    finalTravelData.userAssociatedVaccines.push({
      nameVaccines: 'Tosferina dTDA',
      stateVaccines: false,
    });
  }

  if (travelData.riskFactorUser.eggOrChickenProteinAllergy) {
    finalTravelData.userAssociatedVaccines.push({
      nameVaccines: 'Gripe',
      stateVaccines: false,
    });
  }

  res.locals.travelData = finalTravelData;
  next();
};
