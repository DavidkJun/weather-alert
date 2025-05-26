import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  conditions: { type: [String], required: true },
});
