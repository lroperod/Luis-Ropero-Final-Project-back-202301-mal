import mongoose, { Schema } from 'mongoose';

export interface Travel {
  country: string;
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
}

const travelSchema = new Schema<Travel>({
  country: String,
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
  travelImage: String,
});

export type TravelUser = Omit<Travel, 'travelCreator'>;

export const TravelModel = mongoose.model<Travel>(
  'Travel',
  travelSchema,
  'travels',
);
