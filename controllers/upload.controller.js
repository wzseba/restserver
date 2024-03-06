const { response } = require('express');
const { subirArchivo } = require('../helpers');

const cargarArchivo = async (req, res = response) => {
  try {
    if (
      !req.files ||
      Object.keys(req.files).length === 0 ||
      !req.files.archivo
    ) {
      return res.status(400).json({ msg: 'No hay archivo para cargar' });
    }
    const nombre = await subirArchivo(req.files);

    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  cargarArchivo,
};
