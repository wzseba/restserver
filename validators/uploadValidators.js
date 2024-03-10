const { param } = require('express-validator');
const { existeColeccion } = require('./dbValidators');
const { validationFieldResults } = require('./validatorField');

const putUserOrProductImage = [
  param('coleccion').custom((value, { req }) =>
    existeColeccion(value, req.params.id)
  ),
  validationFieldResults,
];

module.exports = {
  putUserOrProductImage,
};
