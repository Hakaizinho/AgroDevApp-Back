const Tarefa = require("./../model/usuario");

const getTarefa = async (req, res) => {
  const listTarefas = await Tarefa.find();
  return res.status(200).send(listTarefas);
};

const criaTarefa = async (req, res) => {
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
};

const atualizarTarefa = async (req, res) => {
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
};

const deletarTarefa = async (req, res) => {
  if (req.params.id.length <= 23) {
    return res.status(400).send("Caracteries Insuficientes");
  }
  const deleteId = await Tarefa.findById(req.params.id);
  if (!deleteId) {
    return res.status(404).send("Tarefa não encontrado");
  }

  const deleteTarefa = await Tarefa.findByIdAndDelete(req.params.id);
  return res.status(200).send("Tarefa deletada");
};

module.exports = { getTarefa, criaTarefa, atualizarTarefa, deletarTarefa };
