import Router from 'koa-router';
import Order from './service.js';

const router = new Router({
  prefix: '/orders'
});

router.post('/', async (ctx) => {
  try {
    if (!ctx.state.user) {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'Can not create an Order, there is no current user.'
      }
    } else {
      const user = ctx.state.user;
      const items = ctx.body.products;
      const total = ctx.body.total;
      const order = await Order.createOrder({
        userId: user.id,
        buyer: user,
        products: items,
        total: total
      }, ctx.body);
      await CartService.clearById(user.id);
      const data = await order.save();
      ctx.response.status = 200;
      return ctx.body = data;
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.post('/id', async (ctx) => {
  try {
    const id = ctx.body.id;
    const data = await Order.getById(id);
    if (data) {
      ctx.response.status = 200;
      return ctx.body = data;
    } else {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'Order does not exist.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

export default router;
