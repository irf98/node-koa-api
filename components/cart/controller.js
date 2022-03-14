import Router from 'koa-router';
import Cart from './service.js';
import Product from '../products/service.js';

const router = new Router({
  prefix: '/cart'
});

router.post('/', async (ctx) => {
  try {
    if (!ctx.state.user) {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'Can not create new Cart, there is no current user.'
      }
    } else {
      const id = ctx.state.user.id;
      const query = await Cart.getById(id);
      if (query) {
        ctx.response.status = 400;
        return ctx.body = {
          error: 'The requested user already have a Cart.'
        }
      } else  {
        const cart = await Cart.createCart({userId: id}, ctx.body);
        const data = await cart.save();
        ctx.response.status = 201;
        return ctx.body = data;
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.post('/id', async (ctx) => {
  try {
    const id = ctx.state.user.id;
    const data = await Cart.getById(id);
    if (data) {
      ctx.response.status = 200;
      return ctx.body = data;
    } else {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'Cart does not exist.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.post('/products', async (ctx) => {
  try {
    const id = ctx.state.user.id;
    const products = await Cart.getProducts(id);
    const total = await Cart.getTotal(id);
    const data = {
      products,
      total
    }
    if (products && total) {
      ctx.response.status = 200;
      return ctx.body = data;
    } else {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'Invalid parameters'
      };
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.post('/products/add', async (ctx) => {
  try {
    const cartId = ctx.body.cartId;
    const productId = ctx.body.productId;
    const data = await Product.getById(productId);
    if (data) {
      const add = await Cart.addToCart(cartId, data);
      if (add) {
        await Cart.getTotal(cartId);
        ctx.response.status = 200;
        return ctx.body = data;
      } else {
        ctx.response.status = 400;
        return ctx.body = {
          error: 'Error adding to cart.'
        }
      }
    } else {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'Can not add to cart beacuse product does not exist.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.delete('/products/remove', async (ctx) => {
  try {
    const cartId = ctx.body.cartId;
    const productId = ctx.body.productId;
    const cart = await Cart.getById(cartId);
    const product = await Product.getById(productId);
    if (cart && product) {
      const remove = await Cart.deleteProductByCart(cartId, product);
      if (remove) {
        await Cart.getTotal(cartId);
        ctx.response.status = 200;
        return ctx.body = remove;
      } else {
        ctx.response.status = 400;
        return ctx.body = {
          error: 'Error removing from cart.'
        }
      }
    } else {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'Can not remove product because either product or cart does not exist.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.delete('/products/clear', async (ctx) => {
  try {
    const id = ctx.state.user.id;
    const data = await Cart.getById(id);
    if (data) {
      await Cart.clearById(id);
      ctx.response.status = 200;
      return ctx.body = data;
    } else {
      return ctx.body = {
        error: 'Cart does not exist.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

export default router;
