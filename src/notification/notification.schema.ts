import { Schema } from 'mongoose';

export const NotificationSchema = new Schema({
  email: { type: String, required: true },
  city: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
