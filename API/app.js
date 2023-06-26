var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");

var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/ProjetoEngWeb";
//var mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error..."));
db.on("open", function () {
  console.log("Conexão ao MongoDB realizada com sucesso...");
});

var acordaosRouter = require("./routes/acordaosRouter");
var tribunaisRouter = require("./routes/tribunaisRouter");
var AcordaosDetailRouter = require("./routes/acordaodetails");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
/*
app.use(function (req, res, next) {
  var myToken;
  if (req.query && req.query.token) myToken = req.query.token;
  else if (req.body && req.body.token) myToken = req.body.token;
  else myToken = false;
  if (myToken) {
    jwt.verify(myToken, "Acordaos2023", function (e, payload) {
      console.log("aqui" + myToken);
      delete req.query.token;
      console.log("aqui" + JSON.stringify(req.query));
      if (e) {
        res.status(401).jsonp({ error: e });
      } else {
        next();
      }
    });
  } else {
    res.status(401).jsonp({ error: "Token inexistente!" });
  }
});
*/
/*
app.use(function (req, res, next) {
  delete req.query.token;
  console.log(JSON.stringify(req.query));
});
*/
app.use("/details", AcordaosDetailRouter);
app.use("/acordaos", acordaosRouter);
app.use("/tribunais", tribunaisRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.jsonp({ error: err });
});

module.exports = app;
