import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartModel = new Schema({
  userId: {
    type: String,
    required: true
  },
  timestamp: {
    type: 'Date',
    default: Date.now()
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
    thumbnail: {
      type: String
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  total: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('cart', cartModel);
