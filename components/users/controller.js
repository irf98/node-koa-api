import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router({
  prefix: '/users'
});

router.post('/signup', passport.authenticate('signup'), async (ctx) => {
  try {
    if (!ctx.state.user) {
      ctx.response.status = 400;
      return ctx.body = {
        error: 'Error'
      };
    } else {
      ctx.response.status = 201;
      return ctx.state.user;
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.post('/signin', passport.authenticate('signin'), async (ctx) => {
  try {
    if (ctx.isAuthenticated()) {
      const user = ctx.state.user;
      const cart = await CartService.getById(user.id);
      const data = {
        user,
        cart
      }
      ctx.response.status = 200;
      return ctx.body = data;
    } else {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'Error'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

router.post('/signout', async (ctx) => {
  try {
    if (ctx.state.user) {
      ctx.response.status = 200;
      return ctx.logout();
    } else {
      ctx.response.status = 404;
      return ctx.body = {
        error: 'No current user'
      }
    }
  } catch (err) {
    return ctx.response.status = 500;
  }
});

export default router;
