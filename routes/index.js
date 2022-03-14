import products from '../components/products/controller.js';
import users from '../components/users/controller.js';
import cart from '../components/cart/controller.js';

export default function routes(app) {
  app.use(products.routes());
  app.use(users.routes());
  app.use(cart.routes());
}
