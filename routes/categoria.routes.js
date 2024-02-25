const { Router } = require('express');
const {
  createCategory,
  getCategories,
  getCategory,
  putCategory,
  deleteCategory,
} = require('../controllers/categoria.controller');
const { validJTW } = require('../middlewares/jwtVerifications');
const { validatorIdCategory } = require('../validators/categoriasValidator');
const { adminRole } = require('../middlewares/isAdminRole');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', getCategories);

// Obtener categoria por id - publico
router.get('/:id', validatorIdCategory, getCategory);

// Crear categoria - admin
router.post('/', validJTW, adminRole, createCategory);

// Actualizar categoria - admin
router.put('/:id', validJTW, adminRole, validatorIdCategory, putCategory);

// Borrar categoria - admin
router.delete('/:id', validJTW, adminRole, validatorIdCategory, deleteCategory);

module.exports = router;
