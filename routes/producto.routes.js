const { Router } = require('express');
const {
  postProduct,
  getProducts,
  getProduct,
  putProduct,
  deleteProduct,
} = require('../controllers/categoria.controller');
const { validJTW } = require('../middlewares/jwtVerifications');
const { validatorIdProduct } = require('../validators/productoValidator');
const { adminRole } = require('../middlewares/isAdminRole');

const router = Router();

// Obtener todos los producto - publico
router.get('/', getProducts);

// Obtener producto por id - publico
router.get('/:id', validatorIdProduct, getProduct);

// Crear producto - admin
router.post('/', validJTW, adminRole, postProduct);

// Actualizar producto - admin
router.put('/:id', validJTW, adminRole, validatorIdProduct, putProduct);

// Borrar producto - admin
router.delete('/:id', validJTW, adminRole, validatorIdProduct, deleteProduct);

module.exports = router;
