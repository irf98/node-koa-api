import Koa from 'koa';
import koaBody from 'koa-body';
import session from 'koa-session';
import database from './config/db.js';
import auth from './components/users/auth.js';
import routes from './routes/index.js'

const app = new Koa();
const port = 8080;

app.use(koaBody());
app.keys = ['secret'];
app.use(session({}, app));

database();
auth(app);
routes(app);

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});
