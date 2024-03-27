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
    timestamp: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ['default', 'pothole', 'sbump', 'closure','xwalk'], // Add more types as needed
        default: 'default',
    },
  },
  { timestamps: true }
);

export default model('Marker', Marker);
