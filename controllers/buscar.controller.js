const { response } = require('express');

const buscarDB = (req, res = response) => {
  const { coleccion, termino } = req.params;

  res.json({ coleccion, termino });
};

module.exports = {
  buscarDB,
};
