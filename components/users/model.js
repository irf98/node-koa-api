import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userModel = new Schema({
  name: {
    type: 'String',
    required: 'Name is required'
  },
  lastname: {
    type: 'String',
    required: 'Lastname is required'
  },
  address: {
    type: 'String',
    required: 'Address is required'
  },
  age: {
    type: 'String',
    required: 'Age is required'
  },
  phone: {
    type: 'String',
    required: 'Phone is required'
  },
  avatar: {
    type: 'String',
    required: 'Avatar is required'
  },
  username: {
    type: 'String',
    required: 'Username is required'
  },
  password: {
    type: 'String',
    required: 'Password is required'
  },
  time: {
    type: 'Date',
    default: Date.now()
  }
});

export default mongoose.model('User', userModel);
