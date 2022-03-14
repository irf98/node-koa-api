import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(10),
    null
  );
}

export default function auth(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use('signin', new LocalStrategy(
    (username, password, done) => {
      User.findOne({username}, (err, user) => {
        if (err) {
          return done(err);
        }
  
        if (!user) {
          return done(null, false);
        }
  
        if (!isValidPassword(user, password)) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  ));
  
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
    (ctx, username, password, done) => {
      User.findOne({username}, (err, user) => {
        if (err) {
          return done(err);
        }
  
        if (user) {
          return done(null, false);
        }
  
        const data = {
          name: ctx.body.name,
          lastname: ctx.body.lastname,
          address: ctx.body.address,
          age: ctx.body.age,
          phone: ctx.body.phone,
          avatar: ctx.body.avatar,
          username: username,
          password: createHash(password)
        }
  
        User.create(data, (err, userWithId) => {
          if (err) {
            return done(err);
          }
          return done(null, userWithId);
        });
      });
    }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });
}
