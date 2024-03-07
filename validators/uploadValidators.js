const { param } = require('express-validator');
const { existeUsuarioPorId, existeColeccion } = require('./dbValidators');
const { validationFieldResults } = require('./validatorField');

const putUserImage = [
  param('id', 'El id es obligatorio').isMongoId(),
  param('id').custom(existeUsuarioPorId),
  param('coleccion').custom(existeColeccion),
  validationFieldResults,
];

module.exports = {
  putUserImage,
};
