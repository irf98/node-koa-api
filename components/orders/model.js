import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderModel = new Schema({
  userId: {
    type: String,
    required: true
  },
  buyer: {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    age: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  products: [{
    productId: {
      type: String
    },
    title: {
      type: String
    },
    price: {
      type: Number
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  total: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('order', orderModel);
