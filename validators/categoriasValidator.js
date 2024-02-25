const { param } = require('express-validator');
const { existeCategoriaPorId } = require('./dbValidators');
const { validationFieldResults } = require('./validatorField');

const validatorIdCategory = [
  param('id', 'El id es obligatorio').isMongoId(),
  param('id').custom(existeCategoriaPorId),
  validationFieldResults,
];

module.exports = {
  validatorIdCategory,
};
