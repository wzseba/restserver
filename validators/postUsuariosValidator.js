const { check } = require("express-validator");
const { validationFieldResults } = require("./validatorField");
const { emailExiste } = require("./dbValidators");

const postUserValidator = [
  check("nombre", "El nombre es obligatorio")
    .trim()
    .escape()
    .isAlpha()
    .isString()
    .toLowerCase(),
  check("correo", "El email es obligatorio").isEmail(),
  check("password", "El password debe de ser mas de 6 caracteres").isLength({
    min: 6,
  }),
  validationFieldResults,
  //continuar validaciones
  //validacion innecesario de custom correo dado que desde el Schema usamos unique: true
  //validacion de roles escalable con custom error y rolSchema
];

module.exports = {
  postUserValidator,
};
