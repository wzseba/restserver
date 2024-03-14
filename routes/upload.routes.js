const { Router } = require('express');
const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
} = require('../controllers/upload.controller');
const { userOrProductImage } = require('../validators/uploadValidators');
const { correctFile } = require('../middlewares/isCorrectFile');

const router = Router();

router.post('/', correctFile, cargarArchivo);
router.put(
  '/:coleccion/:id',
  correctFile,
  userOrProductImage,
  actualizarImagen
);
router.get('/:coleccion/:id', userOrProductImage, mostrarImagen);

module.exports = router;
