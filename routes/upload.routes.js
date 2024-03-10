const { Router } = require('express');
const {
  cargarArchivo,
  actualizarImagen,
} = require('../controllers/upload.controller');
const { putUserOrProductImage } = require('../validators/uploadValidators');
const { correctFile } = require('../middlewares/isCorrectFile');

const router = Router();

router.post('/', correctFile, cargarArchivo);
router.put(
  '/:coleccion/:id',
  correctFile,
  putUserOrProductImage,
  actualizarImagen
);

module.exports = router;
