const { response } = require('express');

const adminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(501).json({
      msg: 'Token sin validar',
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} no tiene permisos de administrador`,
    });
  }
  next();
};

module.exports = {
  adminRole,
};
