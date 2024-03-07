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

const actualizarImagen = (req, res = response) => {
  const { coleccion, id } = req.params;
  console.log(coleccion, id);
  res.json({ msg: 'Imagen actualizada' });
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
