import mongoose, { Schema, Document } from 'mongoose';
import { Flight, FlightCategory } from '../types/flight';

const PassengerSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  hasConnections: { type: Boolean, required: true },
  age: { type: Number, required: true },
  flightCategory: { 
    type: String, 
    required: true,
    enum: ['Black', 'Platinum', 'Gold', 'Normal']
  },
  reservationId: { type: String, required: true },
  hasCheckedBaggage: { type: Boolean, required: true }
});

const FlightSchema = new Schema({
  flightCode: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  passengers: [PassengerSchema]
}, {
  timestamps: true,
  collection: 'flights'
});

export interface FlightDocument extends Flight, Document {}

export const FlightModel = mongoose.model<FlightDocument>('Flight', FlightSchema);
