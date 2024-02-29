const { response } = require('express');
const { isValidObjectId } = require('mongoose');
const { Usuario } = require('../models');

const coleccionespermitidas = ['usuario', 'categoria', 'role', 'producto'];

const buscarUsuario = async (termino = '', res = response) => {
  const esMongoId = isValidObjectId(termino);

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);

    return res.json({
      results: usuario ? [usuario] : [],
    });
  }
  res.json({ msg: 'mongo id no es correcto' });
};

const buscarDB = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionespermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Colecciones permitidas son: ${coleccionespermitidas}`,
    });
  }

  switch (coleccion) {
    case 'usuario':
      buscarUsuario(termino, res);
      break;
    case 'categoria':
      break;
    case 'producto':
      break;
    case 'role':
      break;
    default:
      res.status(500).json({ msg: 'Problema de server' });
  }

  // res.json({ coleccion, termino });
};

module.exports = {
  buscarDB,
};
