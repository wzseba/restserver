const { Router } = require('express');
const {
  cargarArchivo,
  actualizarImagen,
} = require('../controllers/upload.controller');
const { putUserImage } = require('../validators/uploadValidators');

const router = Router();

router.post('/', cargarArchivo);
router.put('/:coleccion/:id', putUserImage, actualizarImagen);

module.exports = router;
