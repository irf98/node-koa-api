import Product from './model.js';

export default class ProductService {
  static async save(prod) {
    try {
      return await Product.create(prod);
    } catch (err) {
      throw new Error(`Error saving product. ${err}.`);
    }
  }

  static async getById(id) {
    try {
      return await Product.findById(id).exec();
    } catch (err) {
     throw new Error(`Error getting product by ID. ${err}.`);
    }
  }

  static async updateById(id, prod) {
    try {
      const update = {
        $set: { ...prod }
      }
      return await Product.findByIdAndUpdate(id, update);
    } catch (err) {
      throw new Error(`Error updating product by ID. ${err}.`);
    }
  }
  
  static async getAll() {
    try {
      return await Product.find({});
    } catch (err) {
      throw new Error(`Error getting products. ${err}.`);
    }
  }
  
  static async deleteById(id) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(`Error deleting product by ID. ${err}.`);
    }
  }

  static async deleteAll() {
    try {
      return await Product.deleteMany({});
    } catch (err) {
      throw new Error(`Error deleting all products. ${err}.`);
    }
  }
}
