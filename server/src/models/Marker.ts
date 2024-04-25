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
      enum: [
        'default',
        'pothole',
        'sbump',
        'closure',
        'xwalk',
        'cone',
        'carAccident',
        'roadDamage',
        'warningSign',
      ], // Add more types as needed
      default: 'default',
    },
  },
  { timestamps: true }
);

export default model('Marker', Marker);
