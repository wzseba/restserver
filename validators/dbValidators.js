const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = Role.findOne(rol);
  if (!existeRol) {
    throw new Error("El rol no esta registrado en la DB");
  }
};

const emailExiste = async (email) => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error("El email ya se encuentra registrado");
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
};
