const Usuario = require("./../model/usuario");
const usuarioValidator = require("./validator/usuario.validator");
const getUsuarios = async (req, res) => {
  const usuarioS = await Usuario.find();
  res.send(usuarioS);
};

const deleteUsuarios = async (req, res) => {
  try {
    const isValidated = usuarioValidator(req.params, res);
    if (!isValidated) return;

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
};

const criaUsuario = async (req, res) => {
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
};

const alterarUsuario = async (req, res) => {
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
};

module.exports = { getUsuarios, deleteUsuarios, criaUsuario, alterarUsuario };
