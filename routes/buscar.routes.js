const { Router } = require('express');
const { buscarDB } = require('../controllers/buscar.controller');

const router = Router();

router.get('/:coleccion/:termino', buscarDB);

module.exports = router;
