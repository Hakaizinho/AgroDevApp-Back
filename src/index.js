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

const Tarefa = mongoose.model("Tarefas", {
  titulo: String,
  descri: String,
  status: String,
});

app.get("/tarefa", async (req, res) => {
  const listTarefas = await Tarefa.find();
  return res.status(200).send(listTarefas);
});

app.post("/tarefa", async (req, res) => {
  if (!req.body.titulo || !req.body.descri || !req.body.status) {
    return res.status(400).send("Campo incompleto.");
  }
  const tarefasAdd = new Tarefa({
    titulo: req.body.titulo,
    descri: req.body.descri,
    status: req.body.status,
  });
  await tarefasAdd.save();
  return res.status(201).send(tarefasAdd);
});

app.patch("/tarefa/:id", async (req, res) => {
  if (req.params.id.length <= 23) {
    return res.status(400).send("Caracteres Insuficientes");
  }
  const atualizId = await Tarefa.findById(req.params.id);
  if (!atualizId) {
    return res.status(404).send("Tarefa não encontrada.");
  }

  try {
    const atualiz = await Tarefa.findByIdAndUpdate(req.params.id, {
      titulo: req.body.titulo,
      descri: req.body.descri,
      status: req.body.status,
    });
    return res.status(200).send(atualiz);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro de servidor, tente novamente");
  }
});

app.delete("/tarefa/:id", async (req, res) => {
  if (req.params.id.length <= 23) {
    return res.status(400).send("Caracteries Insuficientes");
  }
  const deleteId = await Tarefa.findById(req.params.id);
  if (!deleteId) {
    return res.status(404).send("Tarefa não encontrado");
  }

  const deleteTarefa = await Tarefa.findByIdAndDelete(req.params.id);
  return res.status(200).send("Tarefa deletada");
});

// Cadastor  Clinica Veterinario

const Cadastro = mongoose.model("Cadastros", {
  animal: String,
  sexo: String,
  raca: String,
  peso: String,
  protuario: String,
  tutor: String,
  telefone: String,
});

app.get("/cadastro", async (req, res) => {
  const listCadastro = await Cadastro.find();
  return res.status(200).send(listCadastro);
});

app.post("/cadastro", async (req, res) => {
  if (
    !req.body.animalR ||
    !req.body.sexoR ||
    !req.body.racaR ||
    !req.body.pesoR ||
    !req.body.prontuarioR ||
    !req.body.tutorR ||
    !req.body.telefoneR
  ) {
    return res.status(400).send("Peenchar todos os campos.");
  }

  const novoCadastro = new Cadastro({
    animal: req.body.animalR,
    sexo: req.body.sexoR,
    raca: req.body.racaR,
    peso: req.body.pesoR,
    protuario: req.body.prontuarioR,
    tutor: req.body.tutorR,
    telefone: req.body.telefoneR,
  });
  await novoCadastro.save();
  return res.status(201).send(novoCadastro);
});

app.patch("/cadastro/:id", async (req, res) => {
  if (req.params.id.length <= 23) {
    return res.status(400).send("ID incompleto!");
  }
  const validID = await Cadastro.findById(req.params.id);
  if (!validID) {
    return res.status(404).send("ID nao encontrado.");
  }

  try {
    const atualizarCadastro = await Cadastro.findByIdAndUpdate(req.params.id, {
      animal: req.body.animalR,
      sexo: req.body.sexoR,
      raca: req.body.racaR,
      peso: req.body.pesoR,
      protuario: req.body.prontuarioR,
      tutor: req.body.tutorR,
      telefone: req.body.telefoneR,
    });
    return res.status(200).send(atualizarCadastro);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro de servidor, tente novamente");
  }
});

app.delete("/cadastro/:id", async (req, res) => {
  if (req.params.id.length <= 23) {
    return res.status(400).send("ID incompleto!");
  }
  const validID = await Cadastro.findById(req.params.id);
  if (!validID) {
    return res.status(404).send("ID nao encontrado.");
  }

  const deleteCadastro = await Cadastro.findByIdAndDelete(req.params.id);
  return res.status(200).send("Conta deletada com sucesso!");
});

app.get("/cadastro/:id", async (req, res) => {
  const listCadastro = await Cadastro.findById(req.params.id);
  return res.status(200).send(listCadastro);
});

app.get("/cadastro/animal/:nome", async (req, res) => {
  try {
    const listCadastro = await Cadastro.find({
      animal: req.params.nome,
    });
    return res.status(200).send(listCadastro);
  } catch (error) {
    return res.status(500).send("Erro ao buscar cadastros");
  }
});
