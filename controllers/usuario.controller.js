const { response } = require("express");

const Usuario = require("../models/usuario");
const { encryptPassword } = require("../helpers/hashPass");

const getUsuarios = (req, res = response) => {
  res.json({ msg: "hola" });
};

const postUsuarios = async (req, res = response) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    const user = new Usuario({ nombre, correo, password, rol });

    //Encriptar password
    user.password = encryptPassword(password);

    //Guardar en DB
    await user.save();

    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const putUsuarios = (req, res = response) => {
  res.json({ msg: "hola" });
};

const deleteUsuarios = (req, res = response) => {
  res.json({ msg: "hola" });
};

const patchUsuarios = (req, res = response) => {
  res.json({ msg: "hola" });
};

module.exports = {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
  patchUsuarios,
};
