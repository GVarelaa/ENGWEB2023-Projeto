const mongoose = require('mongoose')

var acordaoSchema = new mongoose.Schema({
    _id: String,
    Processo: String,
    "Nº Convencional": String,
    Relator: String,
    Descritores: [String],
    "Nº do Documento": String,
    "Data do Acordão": String,
    "Votação": String,
    Privacidade: String,
    "Meio Processual": String,
    "Decisão": String,
    "Indicações Eventuais": String,
    "Área Temática 1": String,
    "Área Temática 2": String,
    "Sumário": String,
    "Decisão Texto Integral": String,
    tribunal: String,
    "Acordão": String,
    "Requerido": [String], 
});

module.exports = mongoose.model('acordao', acordaoSchema)

