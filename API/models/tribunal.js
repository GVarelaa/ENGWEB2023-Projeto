const mongoose = require('mongoose')

var tribunalSchema = new mongoose.Schema({
    _id: String,
    nome: String
})

module.exports = mongoose.model('tribunal', tribunalSchema)

