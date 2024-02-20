const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validJTW = async (req = request, res = response, next) => {
  try {
    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({ msg: 'token invalido' });
    }

    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    // verificar que el usuario exista en DB
    const usuario = await Usuario.findById(uid);

    // Verificar si el uid tiene estado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'El estado del usuario esta en false',
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'token invalido' });
  }
};

module.exports = {
  validJTW,
};
