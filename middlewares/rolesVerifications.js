const { response } = require('express');

const verificationRoles = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        msg: 'Error de usuario',
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: 'Necesita un rol autorizado',
      });
    }
    next();
  };
};

module.exports = {
  verificationRoles,
};
