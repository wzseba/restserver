const fs = require('fs');
const path = require('path');
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
  const modelo = req.resultado;

  if (modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads/', carpeta, modelo.img);
    if (fs.existsSync(pathImagen)) fs.unlinkSync(pathImagen);
  }

  const nombre = await subirArchivo(req.files, undefined, carpeta);
  modelo.img = nombre;
  await modelo.save();

  res.json({ msg: 'Imagen actualizada', nombre });
};

const mostrarImagen = (req, res = response) => {
  const carpeta = req.params.coleccion;
  const modelo = req.resultado;

  if (modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads/', carpeta, modelo.img);
    if (fs.existsSync(pathImagen)) return res.sendFile(pathImagen);
  }

  const pathImagenNotFound = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImagenNotFound);
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
};
