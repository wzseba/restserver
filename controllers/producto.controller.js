const { response } = require('express');
const { Producto } = require('../models');

const getProducts = async (req, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;

    const q = { estado: true };

    const [total, productos] = await Promise.all([
      Producto.countDocuments(q),
      Producto.find(q)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(parseInt(desde))
        .limit(parseInt(limite)),
    ]);
    res.json({ total, productos });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error });
  }
};

const getProduct = async (req, res = response) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre');

    res.json(producto);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error });
  }
};

const postProduct = async (req, res = response) => {
  try {
    const { estado, usuario, ...body } = req.body;

    const existeProducto = await Producto.findOne({ nombre: body.nombre });

    if (existeProducto) {
      return res.status(400).json({ msg: 'El producto ya existe' });
    }

    const data = {
      ...body,
      nombre: body.nombre,
      usuario: req.usuario._id,
    };
    const producto = new Producto(data);
    await producto.save();

    res.json({ msg: 'Producto creado correctamente', producto });
  } catch (error) {
    console.log();
    res.json(error);
  }
};

const putProduct = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    const productoPut = await Producto.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.json(productoPut);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteProduct = async (req, res = response) => {
  try {
    const { id } = req.params;

    const productoDelete = await Producto.findByIdAndUpdate(
      id,
      {
        estado: false,
      },
      {
        new: true,
      }
    );

    res.json(productoDelete);
  } catch (error) {
    console.warn();
    res.status(400).json(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
