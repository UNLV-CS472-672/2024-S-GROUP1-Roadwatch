import { Schema, model } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  city?: string;
  address?: string;
  state?: string;
  zip?: string;
  notificationSubscription?: /* PushManager */ string;
}

const User = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    dob: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    zip: {
      type: String,
      default: '',
    },
    notificationSubscription: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default model<IUser>('User', User);
