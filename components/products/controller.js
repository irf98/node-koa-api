import Router from 'koa-router';
import Products from './service.js';

const router = new Router({
  prefix: '/products'
});

router.get('/', async (ctx) => {
  try {
    const products = await Products.getAll();
    if (products) {
      ctx.response.status = 200;
      return ctx.body = products;
    } else {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'There are no products.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.get('/:id', async (ctx) => {
  try {
    const data = await Products.getById(ctx.params.id);
    if (data) {
      ctx.response.status = 200;
      return ctx.body = data;
    } else {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'Product not found.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.post('/', async (ctx) => {
  try {
    const admin = true; //false;
    if (admin === true) {
      const product = await Products.save(ctx.request.body);
      ctx.response.status = 201;
      return ctx.body = product;
    } else {
      return ctx.body = {
        error: 'Could not POST, you do not have permission to access this route.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.put('/:id', async (ctx) => {
  try {
    const admin = true; //false;
    const data = await Products.getById(ctx.params.id);
    if (admin === true) {
      if (data) {
        const update = await Products.updateById(ctx.params.id, ctx.body);
        ctx.response.status = 200;
        return ctx.body = update;
      } else {
        ctx.response.status = 404;
        return ctx.body = {
          error: 'Product does not exist.'
        }
      }
    } else {
      ctx.response.status = 400;
      return ctx.body = {
        error: 'Could not PUT, you do not have permission to access this route.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.delete('/:id', async (ctx) => {
  try {
    const admin = true; //false;
    const data = await Products.getById(ctx.params.id);
    if (admin === true) {
      if (data) {
        const remove = await Products.deleteById(ctx.params.id);
        ctx.response.status = 200;
        return ctx.body = remove;
      } else {
        return ctx.body = {
          error: 'Product does not exist.'
        }
      }
    } else {
      ctx.response.status = 400;
      return ctx.body = {
        error: 'Could not DELETE, you do not have permission to access this route.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.delete('/', async (ctx) => {
  try {
    const data = await Products.getAll();
    const admin = true; //false;
    if (admin === true) {
      if (data) {
        const remove = await Products.deleteAll();
        ctx.response.status = 200;
        return ctx.body = remove;
      } else {
        ctx.response.status = 404;
        return ctx.body = {
          error: 'Could not delete products because the database is empty.'
        } 
      }
    } else {
      ctx.response.status = 400;
      return body = {
        error: 'Could not DELETE, you do not have permission to access this route.'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

export default router;
