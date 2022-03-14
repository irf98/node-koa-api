import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productModel = new Schema({
  title: {
    type: 'String',
    required: 'Product name is required'
  },
  price: {
    type: 'Number',
    required: 'Product price is required'
  },
  thumbnail: {
    type: 'String',
    required: 'Product image is required'
  },
  timestamp: {
    type: 'Date',
    default: Date.now()
  }
});

export default mongoose.model('product', productModel);
