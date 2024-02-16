const { check } = require("express-validator");
const { validationFieldResults } = require("./validatorField");
const { existeUsuarioPorId } = require("./dbValidators");

const postUserValidator = [
  check("nombre", "El nombre es obligatorio")
    .trim()
    .escape()
    .isAlpha()
    .isString()
    .toLowerCase(),
  check("correo", "El email es obligatorio").isEmail().toLowerCase(),
  check("password", "El password debe de ser mas de 6 caracteres").isLength({
    min: 6,
  }),
  validationFieldResults,
  //continuar validaciones
  //validacion innecesario de custom correo dado que desde el Schema usamos unique: true
  //validacion de roles escalable con custom error y rolSchema
];

const putUserValidator = [
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  check("nombre").trim().escape().isString(),
  validationFieldResults,
];

module.exports = {
  postUserValidator,
  putUserValidator,
};
