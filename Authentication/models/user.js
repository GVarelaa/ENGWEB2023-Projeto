const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    _id: String,
    profileId: String,
    name: String,
    surname: String,
    email: String,
    password: String,
    filiation: String,
    level: String,
    favorites: [String],
    dateCreated: String
  });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema)