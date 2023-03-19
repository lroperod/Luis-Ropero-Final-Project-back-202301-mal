import moongose, { Schema } from 'mongoose';

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
});

export const UserModel = moongose.model<User>('User', userSchema, 'users');
