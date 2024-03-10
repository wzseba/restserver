const { response } = require('express');

const correctFile = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: 'No hay archivo para cargar' });
  }

  next();
};

module.exports = {
  correctFile,
};
