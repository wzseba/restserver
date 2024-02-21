const { Router } = require('express');
const {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
} = require('../controllers/usuario.controller');
const {
  postUserValidator,
  putUserValidator,
  deleteUserValidator,
} = require('../validators/usuariosValidator');
const { validJTW } = require('../middlewares/jwtVerifications');
// const { verificationRoles } = require('../middlewares/rolesVerifications');
const { adminRole } = require('../middlewares/isAdminRole');

const router = Router();

router.get('/', getUsuarios);

router.put('/:id', putUserValidator, putUsuarios);

router.post('/', postUserValidator, postUsuarios);

router.delete(
  '/:id',
  validJTW,
  adminRole,
  // verificationRoles('ADMIN_ROLE', 'SUPER_ADMIN'),
  deleteUserValidator,
  deleteUsuarios
);

module.exports = router;
