import { Schema, model, Types } from 'mongoose';

interface IResetPassword {
  user: Types.ObjectId;
  token: string;
  validTime: Date;
}

const ResetPassword = new Schema<IResetPassword>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
    validTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('ResetPassword', ResetPassword);
