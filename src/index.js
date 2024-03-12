const express = require("express");
const { get } = require("express/lib/response");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log(`Ligado`);
  mongoose.connect(
    "mongodb+srv://jofretomas9:E1kVru83H5iGBFGi@agrodev-api.w8s0mop.mongodb.net/?retryWrites=true&w=majority&appName=AgroDev-api"
  );
});

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

app.get("/", async (req, res) => {
  const usuarioS = await Usuario.find();
  res.send(usuarioS);
});

app.delete("/:id", async (req, res) => {
  if (req.params.id.length <= 23) {
    return await res.status(404).send("ID Precisa ter no mínimo 24 caracteres");
  }

  try {
    const user = await Usuario.findById(req.params.id);
    // (!user) o !-> nao exitir
    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    const deletedUser = await Usuario.findByIdAndDelete(req.params.id);
    return res.send("Usuário excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return res.status(500).send("Erro ao excluir usuário");
  }
});

app.post("/", async (req, res) => {
  if (
    !req.body.nomeReq ||
    !req.body.sobrenomeReq ||
    !req.body.emailReq ||
    !req.body.cidadeReq ||
    !req.body.estadoReq ||
    !req.body.cepReq
  ) {
    return res.status(404).send("Algum campo nao foi preechido.");
  }
  const criaUsuario = new Usuario({
    nome: req.body.nomeReq,
    sobrenome: req.body.sobrenomeReq,
    email: req.body.emailReq,
    usuario: req.body.usuarioReq,
    endereço: {
      cidade: req.body.cidadeReq,
      estado: req.body.estadoReq,
      cep: req.body.cepReq,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await criaUsuario.save();
  res.send(criaUsuario);
});

app.patch("/:id", async (req, res) => {
  if (req.params.id.length <= 23) {
    return res.status(404).send("ID Precisa ter no mínimo 24 caracteres");
  }
  try {
    const user = await Usuario.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Usuario não encontrado.");
    }
    const alter = await Usuario.findByIdAndUpdate(req.params.id, {
      nome: req.body.nomeReq,
      sobrenome: req.body.sobrenomeReq,
      email: req.body.emailReq,
      endereco: {
        cidade: req.body.cidadeReq,
        estado: req.body.estadoReq,
        cep: req.body.cepReq,
      },
      updatedAt: new Date(),
    });
    return res.send("Alteração concluida.");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return res.status(500).send("Erro ao excluir usuário");
  }
});

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
