const { response } = require('express');
const { Categoria } = require('../models');

const getCategories = async (req, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;

    const q = { estado: true };

    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(q),
      Categoria.find(q)
        .populate('usuario', 'nombre')
        .skip(parseInt(desde))
        .limit(parseInt(limite)),
    ]);
    res.json({ total, categorias });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error });
  }
};

const getCategory = async (req, res = response) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate(
      'usuario',
      'nombre'
    );

    res.json(categoria);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error });
  }
};

const createCategory = async (req, res = response) => {
  try {
    // const nombre = req.body.nombre.toUpperCase();
    const nombre = req.body.nombre;
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

const putCategory = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    // data.nombre = data.nombre.toUpperCase();
    // data.usuario = req.usuario._id;

    const categoriaPut = await Categoria.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json(categoriaPut);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteCategory = async (req, res = response) => {
  try {
    const { id } = req.params;

    const categoriaDelete = await Categoria.findByIdAndUpdate(
      id,
      {
        estado: false,
      },
      {
        new: true,
      }
    );

    res.json(categoriaDelete);
  } catch (error) {
    console.warn();
    res.status(400).json(error);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  putCategory,
  deleteCategory,
};
