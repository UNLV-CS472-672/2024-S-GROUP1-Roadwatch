import { Schema, model, Types } from 'mongoose';

const Community = new Schema(
  {
    address: { type: String, required: true },
    users: [{ type: Types.ObjectId, ref: 'User' }],
    image: { type: String, default: '' },
    posts: [{ type: Types.ObjectId, ref: 'Post' }],
    // Add more community fields as needed
  },
  { timestamps: true }
);

export default model('Community', Community);
