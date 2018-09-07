const passport = require('passport');
const User = require('./models/user');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const config = require('./config');

passport.use(new JWTStrategy(config,
  function(jwt_payload, done) {
      return User.findOne({email: jwt_payload.email, password: jwt_payload.password})
        .then(user => {
          if (!user) {
            return done(null, false)
          } else {
            return done(null, user)
          }   
        })
        .catch(err => console.log(err));
  }
));

module.exports = passport;