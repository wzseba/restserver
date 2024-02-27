const { param, body } = require('express-validator');
const { existeProductoPorId, existeCategoriaPorId } = require('./dbValidators');
const { validationFieldResults } = require('./validatorField');

const validatorIdProduct = [
  param('id', 'El id es obligatorio').isMongoId(),
  param('id').custom(existeProductoPorId),
  validationFieldResults,
];

const validatorPostProducto = [
  body('nombre', 'El nombre es obligatorio')
    .trim()
    .escape()
    .isAlpha()
    .isString(),
  body('categoria', 'La categoria no es valida').isMongoId(),
  body('categoria').custom(existeCategoriaPorId),
  validationFieldResults,
];

module.exports = {
  validatorIdProduct,
  validatorPostProducto,
};
