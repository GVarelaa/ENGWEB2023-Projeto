var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require('cors')

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook');
require('dotenv').config()

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/ProjetoEngWeb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function () {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});

// passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));


/*const GOOGLE_CLIENT_ID = "815138057920-qek265olb70qlad9i5jg5q428vkrv447.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/login/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));*/

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8072/login/facebook/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile)
    User.findOne({_id: profile.id})
      .then(response => {
        console.log(response)
        // Já existe
        if(response){
          console.log("entrei aqui")
          return cb(null, response)
        }
        else{
          var user = new User({
              _id: profile.id,
              profileId: profile.id,
              name: "pocrl",
              email: "pocrl",
              password: "pocrl",
              level: "pocrl",
              favorites: [],
              dateCreated: "pocrl"
          })

          User.create(user)
            .then(response => {
              return cb(null, user)
            })
            .catch(error => {
              console.log(error)
              return cb(error, null)
            })
        }
      })
      .catch(error => {
        return cb(error, null)
      })
  }
));


var usersRouter = require('./routes/users');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.jsonp({ error: err });
});

module.exports = app;
