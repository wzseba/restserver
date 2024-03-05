const { response } = require('express');
const { extensionPermitida } = require('../helpers/extensionVerify');
const path = require('path');

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: 'No hay archivo para cargar' });
  }
  const { archivo } = req.files;

  try {
    extensionPermitida(archivo);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  const uploadPath = path.join(__dirname, '../uploads/', archivo.name);

  archivo.mv(uploadPath, function (err) {
    if (err) return res.status(500).json(err);

    res.json({ msg: 'Archivo cargado correctamente' });
  });
};

module.exports = {
  cargarArchivo,
};
