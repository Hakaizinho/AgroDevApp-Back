const mongoose = require("mongoose");

const Cadastro = mongoose.model("Cadastros", {
  animal: String,
  sexo: String,
  raca: String,
  peso: String,
  protuario: String,
  tutor: String,
  telefone: String,
});

module.exports = Cadastro;
