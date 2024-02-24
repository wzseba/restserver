const { Router } = require('express');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
  res.json({ msg: 'get' });
});
// Obtener categoria por id - publico
router.get('/:id', (req, res) => {
  res.json({ msg: 'get' });
});
// Crear categoria - admin
router.post('/', (req, res) => {
  res.json({ msg: 'post' });
});
// Actualizar categoria - admin
router.put('/:id', (req, res) => {
  res.json({ msg: 'put' });
});
// Borrar categoria - admin
router.delete('/:id', (req, res) => {
  res.json({ msg: 'delete' });
});

module.exports = router;
