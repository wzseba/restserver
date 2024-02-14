const { response } = require("express");

const getUsuarios = (req, res = response) => {
  res.json({ msg: "hola" });
};

const putUsuarios = (req, res = response) => {
  res.json({ msg: "hola" });
};

const postUsuarios = (req, res = response) => {
  res.json({ msg: "hola" });
};

const deleteUsuarios = (req, res = response) => {
  res.json({ msg: "hola" });
};

const patchUsuarios = (req, res = response) => {
  res.json({ msg: "hola" });
};

module.exports = {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
  patchUsuarios,
};
