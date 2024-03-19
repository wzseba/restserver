const fs = require('fs');
const path = require('path');
const { response } = require('express');
const { subirArchivo } = require('../helpers');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

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

const actualizarImagenCloudinary = async (req, res = response) => {
  try {
    const modelo = req.resultado;
    const { tempFilePath } = req.files.archivo;

    if (modelo.img) {
      const nombreArray = modelo.img.split('/');
      const nombre = nombreArray[nombreArray.length - 1];
      const [imgID] = nombre.split('.');

      await cloudinary.uploader.destroy(imgID);
    }

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;
    await modelo.save();

    res.json({ modelo });
  } catch (error) {
    console.error(error);
  }
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
  actualizarImagenCloudinary,
  mostrarImagen,
};
