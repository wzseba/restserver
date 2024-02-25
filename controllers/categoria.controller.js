const { response } = require('express');
const { Categoria } = require('../models');

const createCategory = async (req, res = response) => {
  try {
    const nombre = req.body.nombre.toUpperCase();

    const existeNombre = await Categoria.findOne({ nombre });

    if (existeNombre) {
      return res.status(400).json({ msg: 'la categoria ya existe' });
    }

    const data = {
      nombre,
      usuario: req.usuario._id,
    };
    const categoria = new Categoria(data);
    await categoria.save();

    res.json({ msg: 'categoria creada correctamente', categoria });
  } catch (error) {
    console.log();
    res.json(error);
  }
};

module.exports = {
  createCategory,
};
