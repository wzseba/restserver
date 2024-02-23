const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jsonWebToken');
const { googleVerify } = require('../helpers/googleVerifyToken');
const { encryptPassword } = require('../helpers/hashPass');

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

    const { nombre, correo, img } = await googleVerify(idToken);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      // Crear usuario
      const data = {
        nombre,
        correo,
        password: encryptPassword(process.env.PASSWORD_DEFAULT),
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Usuario Bloquedo',
      });
    }

    const token = generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.warn(error);
    res.status(400).json({
      msg: 'El token no se puede verificar',
    });
  }
};

module.exports = {
  loginUsuarios,
  googleSignIn,
};
