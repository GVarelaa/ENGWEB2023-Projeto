var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var logger = require("morgan");
var cors = require("cors");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var FacebookStrategy = require("passport-facebook");
require("dotenv").config();
const fileUpload = require("express-fileupload");

var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/ProjetoEngWeb";
//var mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão ao MongoDB..."));
db.once("open", function () {
  console.log("Conexão ao MongoDB realizada com sucesso...");
});

// passport config
var User = require("./models/user");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new FacebookStrategy(
    {
      clientID: "801873144911281",
      clientSecret: "28625f356a0022764f56cd48f3385ddd",
      callbackURL: "http://localhost:8072/login/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("A verificar....");
      User.findOne({ facebookID: profile.id })
        .then((user) => {
          console.log(profile);
          if (user) {
            return cb(null, user);
          } else {
            const newUser = new User({
              username: profile.id,
              name: profile.displayName,
              surname: "",
              email: "",
              filiation: "",
              level: "Consumidor",
              favorites: [],
              dateCreated: new Date().toISOString().substring(0, 19),
              lastAccess: "",
              facebookID: profile.id,
            });

            User.create(newUser)
              .then((response) => {
                return cb(null, newUser);
              })
              .catch((error) => {
                return cb(error);
              });
          }
        })
        .catch((error) => {
          return cb(error);
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "220359416942-mojpsoa6cmjo794k3ik34qbfsc5smldv.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8072/login/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("A verificar....");
      User.findOne({ googleID: profile.id })
        .then((user) => {
          if (user) {
            return cb(null, user);
          } else {
            const newUser = new User({
              username: profile.emails[0].value || profile.id,
              name: profile.name.givenName || profile.displayName || "",
              surname: profile.name.familyName || "",
              email: "",
              filiation: "",
              level: "Consumidor",
              favorites: [],
              dateCreated: new Date().toISOString().substring(0, 19),
              lastAccess: "",
              googleID: profile.id,
            });

            User.create(newUser)
              .then((response) => {
                return cb(null, newUser);
              })
              .catch((error) => {
                return cb(error);
              });
          }
        })
        .catch((error) => {
          return cb(error);
        });
    }
  )
);

var usersRouter = require("./routes/users");

var app = express();
app.use(fileUpload())

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "olhafodasse",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.jsonp({ error: err });
});

module.exports = app;
