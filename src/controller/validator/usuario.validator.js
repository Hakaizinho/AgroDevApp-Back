const requiridoMinimoCaracter = require("./../../validator/requirido.minimo.caracter");
const usuarioValidator = (campos, res) => {
  return requiridoMinimoCaracter("id", campos, 23, res);
};

module.exports = usuarioValidator;
