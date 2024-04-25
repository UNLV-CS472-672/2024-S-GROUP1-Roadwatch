import { Schema, model } from 'mongoose';

const Marker = new Schema(
  {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['cone', 'pothole', 'RoadDamage', 'CarAccident', 'WarningSign'], // Add more types as needed
      default: 'cone',
    },
  },
  { timestamps: true }
);

export default model('Marker', Marker);
