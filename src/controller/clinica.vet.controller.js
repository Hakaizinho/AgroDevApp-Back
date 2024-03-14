const Cadastro = require("../model/clinica.vet");

const getClinica = async (req, res) => {
  const listCadastro = await Cadastro.find();
  res.send(listCadastro);
};

const criaClinica = async (req, res) => {
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
};

const atualizarClinica = async (req, res) => {
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
};

const deleteClinica = async (req, res) => {
  if (req.params.id.length <= 23) {
    return res.status(400).send("ID incompleto!");
  }
  const validID = await Cadastro.findById(req.params.id);
  if (!validID) {
    return res.status(404).send("ID nao encontrado.");
  }

  const deleteCadastro = await Cadastro.findByIdAndDelete(req.params.id);
  return res.status(200).send("Conta deletada com sucesso!");
};

const pesquisaId = async (req, res) => {
  const listCadastro = await Cadastro.findById(req.params.id);
  return res.status(200).send(listCadastro);
};

const pesquisaNome = async (req, res) => {
  try {
    const listCadastro = await Cadastro.find({
      animal: req.params.nome,
    });
    return res.status(200).send(listCadastro);
  } catch (error) {
    return res.status(500).send("Erro ao buscar cadastros");
  }
};

module.exports = {
  getClinica,
  criaClinica,
  atualizarClinica,
  deleteClinica,
  pesquisaId,
  pesquisaNome,
};
