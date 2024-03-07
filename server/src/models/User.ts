import { Schema, model} from 'mongoose';

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
    unique: true,
  },
  city: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
}, { timestamps: true });

export default model('User', User);