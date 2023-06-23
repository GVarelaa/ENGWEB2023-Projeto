const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    name: String,
    surname: String,
    email: String,
    filiation: String,
    level: Number,
    favorites: [String],
    dateCreated: String,
    lastAccess: String,
    facebookID: String,
    googleID: String
  });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema)