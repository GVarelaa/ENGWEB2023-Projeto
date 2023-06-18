const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    name: String,
    surname: String,
    email: String,
    filiation: String,
    level: String,
    favorites: [String],
    dateCreated: String,
    facebookID: String,
    googleID: String
  });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema)