const express = require("express");
const { get } = require("express/lib/response");
const mongoose = require("mongoose");
const Usuario = require("./model/usuario.js");

const {
  getUsuarios,
  deleteUsuarios,
  criaUsuario,
  alterarUsuario,
} = require("./controller/usuario.controller.js");

const {
  getTarefa,
  criaTarefa,
  atualizarTarefa,
  deletarTarefa,
} = require("./controller/tarefa.controller.js");

const {
  getClinica,
  criaClinica,
  atualizarClinica,
  deleteClinica,
  pesquisaId,
  pesquisaNome,
} = require("./controller/clinica.vet.controller.js");

const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log(`Ligado`);
  mongoose.connect(
    "mongodb+srv://jofretomas9:E1kVru83H5iGBFGi@agrodev-api.w8s0mop.mongodb.net/?retryWrites=true&w=majority&appName=AgroDev-api"
  );
});

app.get("/", getUsuarios);

app.post("/", criaUsuario);

app.delete("/:id", deleteUsuarios);

app.patch("/:id", alterarUsuario);

// LISTA DE TAREFAS

app.get("/tarefa", getTarefa);

app.post("/tarefa", criaTarefa);

app.patch("/tarefa/:id", atualizarTarefa);

app.delete("/tarefa/:id", deletarTarefa);

// Cadastor  Clinica Veterinario

app.get("/cadastro", getClinica);

app.post("/cadastro", criaClinica);

app.patch("/cadastro/:id", atualizarClinica);

app.delete("/cadastro/:id", deleteClinica);

app.get("/cadastro/:id", pesquisaId);

app.get("/cadastro/animal/:nome", pesquisaNome);
