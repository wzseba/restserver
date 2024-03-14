const { param } = require('express-validator');
const { existeColeccion } = require('./dbValidators');
const { validationFieldResults } = require('./validatorField');

const userOrProductImage = [
  param('coleccion').custom((value, { req }) => existeColeccion(value, req)),
  validationFieldResults,
];

module.exports = {
  userOrProductImage,
};
