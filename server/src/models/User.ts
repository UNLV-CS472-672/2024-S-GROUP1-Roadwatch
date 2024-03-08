import { Schema, model } from 'mongoose';

const User = new Schema({
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
}, { timestamps: true });

export default model('User', User);
