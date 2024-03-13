const requiridoMinimoCaracter = (
  campoParaVerificar,
  campos,
  tamanhoNecessario,
  res
) => {
  if (
    campos[campoParaVerificar] &&
    campos[campoParaVerificar].length <= tamanhoNecessario
  ) {
    res
      .status(400)
      .send(`${campoParaVerificar} Precisa ter no mínimo 24 caracteres`);
    return false;
  }
  return true;
};

module.exports = requiridoMinimoCaracter;
