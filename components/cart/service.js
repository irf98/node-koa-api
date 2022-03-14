import Cart from './model.js';

export default class CartService {
 static async createCart(add) {
    try {
      const newCart = new Cart(add);
      return await newCart;
    } catch (err) {
      throw new Error(`Error creating cart. ${err}.`);
    }
  }

  static async getById(id) {
    try {
      return await Cart.findOne({ userId: id }).exec();
    } catch (err) {
      throw new Error(`Error getting cart by ID. ${err}.`);
    }
  }

  static async clearById(id) {
    try {
      const cart = await Cart.findOne({ userId: id }).exec();
      cart.products = [];
      return await cart.save();
    } catch (err) {
      throw new Error(`Error deleting cart by ID. ${err}.`);
    }
  }

  static async getProducts(id) {
    try {
      const cart = await Cart.findOne({ userId: id }).exec();
      const products = cart.products;
      return await products;
    } catch (err) {
      throw new Error(`Error getting cart products. ${err}.`);
    }
  }

  static async getTotal(id) {
    try {
      const cart = await Cart.findOne({ userId: id }).exec();
      cart.total = cart.products.reduce((total, item) => {
        return total + (item.quantity * item.price)
      }, 0);
      await cart.save();
      return cart.total;
    } catch (err) {
      throw new Error(`Error getting cart products. ${err}.`);
    }
  }

  static async addToCart(id, prod) {
    try {
      const cart = await Cart.findOne({ userId: id }).exec();
      const item = cart.products.find(
        e => e.id === prod.id
      );
      if (!item) {
        cart.products.push(prod);
      } else {
        item.quantity += 1;
      }
      return await cart.save();
    } catch (err) {
      throw new Error(`Error adding to cart. ${err}.`);
    }
  }

  static async deleteProductByCart(id, prod) {
    try {
      const cart = await Cart.findOne({ userId: id }).exec();
      const item = cart.products.find(
        e => e.id === prod.id
      );
      if (item.quantity === 1) {
        cart.products = cart.products.filter((e) =>
          e.id !== prod.id
        );
      } else {
        item.quantity = item.quantity - 1;
      }
      return await cart.save();
    } catch (err) {
      throw new Error(`Error deleting product in cart. ${err}.`);
    }
  }
}
