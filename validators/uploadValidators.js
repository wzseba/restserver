const { param } = require('express-validator');
const { /* existeUsuarioPorId,*/ existeColeccion } = require('./dbValidators');
const { validationFieldResults } = require('./validatorField');

const putUserOrProductImage = [
  param('coleccion').custom((coleccion, { req }) =>
    existeColeccion(coleccion, req.params.id)
  ),
  validationFieldResults,
];

module.exports = {
  putUserOrProductImage,
};
