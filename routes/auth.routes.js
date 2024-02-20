const { Router } = require('express');
const { loginUsuarios } = require('../controllers/auth.controller');
const { postAuthValidator } = require('../validators/authValidators');

const router = Router();

router.post('/login', postAuthValidator, loginUsuarios);

module.exports = router;
