const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jsonWebToken');

const loginUsuarios = async (req, res = response) => {
  try {
    const { correo, password } = req.body;
    // Verifico si el email existe
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({ msg: 'Correo incorrecto' });
    }

    // Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({ msg: 'El usuario no esta activo' });
    }
    // Verifico si la contraseña es correcta
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({ msg: 'Password incorrecto' });
    }

    // Genero el JWT
    const token = generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const googleSignIn = async (req, res = response) => {
  try {
    const { idToken } = req.body;

    res.json({
      msg: 'todo bien',
      idToken,
    });
  } catch (error) {
    console.warn(error);
  }
};

module.exports = {
  loginUsuarios,
  googleSignIn,
};
