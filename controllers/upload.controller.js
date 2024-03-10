const { response } = require('express');
const { subirArchivo } = require('../helpers');

const cargarArchivo = async (req, res = response) => {
  try {
    // Subir archivo con extension definida
    const nombre = await subirArchivo(req.files, ['.docx', '.md'], 'imagenes');

    // Subir archivo con carpeta definida y extensiones predeterminadas
    // const nombre = await subirArchivo(req.files, undefined, 'imagenes');

    // Subir imagenes con extensiones prederminadas
    // const nombre = await subirArchivo(req.files);

    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const actualizarImagen = async (req, res = response) => {
  const carpeta = req.params.coleccion;

  const nombre = await subirArchivo(req.files, undefined, carpeta);
  res.json({ msg: 'Imagen actualizada', nombre });
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
