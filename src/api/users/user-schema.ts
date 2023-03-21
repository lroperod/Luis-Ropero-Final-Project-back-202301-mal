import moongose, { Schema } from 'mongoose';
import { Destination } from '../destinations/destination-schema';

export interface User {
  name: string;
  email: string;
  password: string;
  imageURL: string | undefined;
  riskFactor: {
    chronicRespiratoriyDisease: boolean;
    stayingRuralArea: boolean;
    intentionHaveChildren: boolean;
    eggOrChickenProteinAllergy: boolean;
  };
  imageFavouriteUser: string;

  destination: Destination;
}
export type UserRegistration = Pick<User, 'name' | 'email' | 'password'>;

const userSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  imageURL: String,
  riskFactor: {
    chronicRespiratoriyDisease: Boolean,
    stayingRuralArea: Boolean,
    intentionHaveChildren: Boolean,
    eggOrChickenProteinAllergy: Boolean,
  },
  destination: { type: Schema.Types.ObjectId, ref: 'Destination' },
});

export const UserModel = moongose.model<User>('User', userSchema, 'users');
