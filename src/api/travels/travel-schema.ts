import mongoose, { Schema } from 'mongoose';

export interface Travel {
  userAssociatedVaccines: {
    nameVaccines: string;
    stateVaccines: boolean;
  }[];
  travelAssociatedVaccines: {
    nameVaccines: string;
    stateVaccines: boolean;
  }[];
  travelCreator: string;
  travelImage: string;
  continent: string;
  userName: string;
}

const travelSchema = new Schema<Travel>({
  userAssociatedVaccines: [
    {
      nameVaccines: String,
      stateVaccines: Boolean,
    },
  ],
  travelAssociatedVaccines: [
    {
      nameVaccines: String,
      stateVaccines: Boolean,
    },
  ],
  travelCreator: String,
  travelImage: String,
  continent: String,
  userName: String,
});

export interface TravelVaccines {
  userName: string;
  continent: string;
  stayingRuralArea: string;
  chronicRespiratoryDisease: string;
  intentionHaveChildren: string;
  eggOrChickenProteinAllergy: string;
}

export const TravelModel = mongoose.model<Travel>(
  'Travel',
  travelSchema,
  'travels',
);
