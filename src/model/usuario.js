const mongoose = require("mongoose");

const Usuario = mongoose.model("Usuarios", {
  nome: String,
  sobrenome: String,
  email: String,
  usuario: String,
  endereço: {
    cidade: String,
    estado: String,
    cep: String,
  },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = Usuario;
