const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Producto, Categoria } = require('../models');

const coleccionespermitidas = ['usuario', 'categoria', 'role', 'producto'];

const busquedaFlexible = async (model, coleccion, termino = '') => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const results = await model.findById(termino);

    return { results };
  }
  const regex = new RegExp(termino, 'i');

  const query = {
    producto: {
      $and: [{ nombre: regex }, { estado: true }],
    },
    usuario: {
      $or: [{ nombre: regex }, { correo: regex }],
      $and: [{ estado: true }],
    },
    categoria: {
      $and: [{ nombre: regex }, { estado: true }],
    },
  };

  const results = await model.find(query[coleccion]);
  const populatePromise = [
    await model.populate(results, { path: 'categoria', select: 'nombre' }),
    await model.populate(results, { path: 'producto', select: 'nombre' }),
    await model.populate(results, { path: 'usuario', select: 'nombre' }),
  ];

  await Promise.all(populatePromise);

  return { results };
};

const buscarDB = async (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionespermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Colecciones permitidas son: ${coleccionespermitidas}`,
    });
  }

  // Objeto literal en donde la notación[coleccion] accede a propiedades para llamar a cada funcion
  const resultado = await {
    usuario: busquedaFlexible(Usuario, coleccion, termino),
    categoria: busquedaFlexible(Categoria, coleccion, termino),
    producto: busquedaFlexible(Producto, coleccion, termino),
  }[coleccion];

  res.json(resultado);
};

module.exports = {
  buscarDB,
};
