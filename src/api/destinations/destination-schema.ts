import mongoose, { Schema } from 'mongoose';

export interface Destination {
  country: string;
  associatedVaccines: {
    nameVaccines: string;
    stateVaccines: boolean;
  }[];
}

const destinationSchema = new Schema<Destination>({
  country: String,
  associatedVaccines: [
    {
      nameVaccines: String,
      stateVaccines: Boolean,
    },
  ],
});

export const UserModel = mongoose.model<Destination>(
  'Destination',
  destinationSchema,
  'destinations',
);
