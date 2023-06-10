const mongoose = require('mongoose')


var acordaoSchema = new mongoose.Schema({
    _id: String,
    Processo: String,
    "Nº Convencional": String,
    Relator: String,
    Descritores: [String],
    "Nº do Documento": String,
    Data: String,
    "Votação": String,
    Privacidade: String,
    "Meio Processual": String,
    "Decisão": String,
    "Indicações Eventuais": String,
    "Área Temática": String,
    "Sumário": String,
    "Decisão Texto Integral": String
});

module.exports = mongoose.model('acordao', acordaoSchema)

