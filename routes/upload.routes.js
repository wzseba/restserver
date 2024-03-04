const { Router } = require('express');
const { cargarArchivo } = require('../controllers/upload.controller');

const router = Router();

router.post('/', cargarArchivo);

module.exports = router;
