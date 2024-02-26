const { param } = require('express-validator');
const { existeProductoPorId } = require('./dbValidators');
const { validationFieldResults } = require('./validatorField');

const validatorIdProduct = [
  param('id', 'El id es obligatorio').isMongoId(),
  param('id').custom(existeProductoPorId),
  validationFieldResults,
];

module.exports = {
  validatorIdProduct,
};
