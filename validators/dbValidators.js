const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role');

const esRoleValido = async (rol = '') => {
  const existeRol = Role.findOne(rol);
  if (!existeRol) {
    throw new Error('El rol no esta registrado en la DB');
  }
};

const existeUsuarioPorId = async id => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error('El usuario con ese id no existe');
  }
};

const existeCategoriaPorId = async id => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error('La Categoria con ese id no existe');
  }
};

const existeProductoPorId = async id => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error('El producto con ese id no existe');
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
  existeCategoriaPorId,
  existeProductoPorId,
  // emailExiste,
};
