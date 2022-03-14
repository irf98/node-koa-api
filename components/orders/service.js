import Order from './model.js';

export default class OrderService {
  static async createOrder(add) {
    try {
      const newOrder = new Order(add);
      return await newOrder;
    } catch (err) {
      throw new Error(`Error creating an Order. ${err}.`);
    }
  }

  static async getById(id) {
    try {
      return await Order.find({ userId: id }).exec();
    } catch (err) {
      throw new Error(`Error getting orders by ID. ${err}.`);
    }
  }
}
