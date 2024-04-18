import { Schema, model } from 'mongoose';

const Community = new Schema(
  {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    radius: { type: Number, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    image: { type: String, default: '' },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

export default model('Community', Community);
