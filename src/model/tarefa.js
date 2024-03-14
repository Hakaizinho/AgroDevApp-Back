const mongoose = require("mongoose");

const Tarefa = mongoose.model("Tarefas", {
  titulo: String,
  descri: String,
  status: String,
});

module.exports = Tarefa;
