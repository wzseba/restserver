const { response } = require('express');

const Usuario = require('../models/usuario');
const { encryptPassword } = require('../helpers/hashPass');

const getUsuarios = async (req, res = response) => {
  try {
    const { limite = 5, desde = 0 } = req.query;

    const q = { estado: true };

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(q),
      Usuario.find(q).skip(parseInt(desde)).limit(parseInt(limite)),
    ]);
    res.json({ total, usuarios });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const postUsuarios = async (req, res = response) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    const user = new Usuario({ nombre, correo, password, rol });

    // Encriptar password
    user.password = encryptPassword(password);

    // Guardar en DB
    await user.save();

    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: 'El correo ya se encuentra en la BD' });
  }
};

const putUsuarios = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) resto.password = encryptPassword(password);

    const userPut = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json(userPut);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteUsuarios = async (req, res = response) => {
  try {
    const { id } = req.params;

    const userDelete = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(userDelete);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const patchUsuarios = (req, res = response) => {
  res.json({ msg: 'hola' });
};

module.exports = {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
  patchUsuarios,
};
