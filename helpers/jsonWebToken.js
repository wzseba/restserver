const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const generarJWT = uid => {
  try {
    const token = jwt.sign({ uid }, process.env.SECRET_KEY, {
      expiresIn: '15m',
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error('Error al generar token');
  }
};

const comprobarJWT = async (token = '') => {
  try {
    if (token.length < 10) return null;

    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    const usuario = await Usuario.findById(uid);

    if (usuario) {
      if (usuario.estado) {
        return usuario;
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

module.exports = {
  generarJWT,
  comprobarJWT,
};
