const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = Role.findOne(rol);
  if (!existeRol) {
    throw new Error("El rol no esta registrado en la DB");
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error("El usuario con ese id no existe");
  }
};

// const emailExiste = async (email) => {
//   const existeEmail = await Usuario.findOne({ email });
//   if (existeEmail) {
//     throw new Error("El email ya se encuentra registrado");
//   }
// }; En el Schema de usuario tengo la propiedad unique: true lo que me impide crear duplicados

module.exports = {
  esRoleValido,
  existeUsuarioPorId,
  // emailExiste,
};
