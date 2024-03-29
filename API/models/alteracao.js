const mongoose = require("mongoose");

var acordaoSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  Processo: String,
  Relator: String,
  Descritores: [String],
  "Data do Acordão": String,
  Votação: String,
  Sumário: String,
  "Decisão Texto Integral": String,
  tribunal: String,
  Decisão: String,
  "Meio Processual": String,
  Legislações: LegislacoesSchema,
  "Área Temática 1": [String],
  "Referências Internacionais": [String],
  Jurisprudências: JurisprudenciasSchema,
  "Tribunal Recorrido": String,
  "Processo no Tribunal Recorrido": String,
  "Referência Processo": String,
  "Indicações Eventuais": [String],
  "Nº Convencional": String,
  "Nº do Documento": String,
  Requerente: String,
  Requerido: [String],
  "Data de Entrada": String,
  Objecto: String,
  "Área Temática 2": [String],
  Doutrina: [String],
  "Recusa Aplicação": String,
  "Referência a Pareceres": [String],
  Privacidade: String,
  Apêndice: String,
  "Data do Apêndice": String,
  "Referências Publicação": [String],
  Reclamações: [String],
  Apenso: String,
  "Data da Decisão": String,
  Recurso: String,
  "Juízo ou Secção": String,
  Tribunal: String,
  "Parecer Ministério Publico": String,
  Magistrado: String,
  Acordão: String,
  "Volume dos Acordãos do T.C.": String,
  Autor: String,
  Réu: [String],
});

var alteracaoSchema = new mongoose.Schema({
  _id: String,
  "Campos Alterados": [String],
  "Data de Alteração": String,
  Acordao: acordaoSchema,
});

module.exports = mongoose.model("alteracao", alteracaoSchema);
