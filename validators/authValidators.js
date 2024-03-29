const { check } = require('express-validator');
const { validationFieldResults } = require('./validatorField');

const postAuthValidator = [
  check('correo', 'El correo es oligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validationFieldResults,
];

const authGoogleSignIn = [
  check('idToken', 'Token de google es necesario').not().isEmpty(),
  validationFieldResults,
];

module.exports = {
  postAuthValidator,
  authGoogleSignIn,
};
