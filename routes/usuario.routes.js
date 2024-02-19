const { Router } = require("express");
const {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
  patchUsuarios,
} = require("../controllers/usuario.controller");
const {
  postUserValidator,
  putUserValidator,
  deleteUserValidator,
} = require("../validators/usuariosValidator");
const { validJTW } = require("../middlewares/jwtVerifications");

const router = Router();

router.get("/", getUsuarios);

router.put("/:id", putUserValidator, putUsuarios);

router.post("/", postUserValidator, postUsuarios);

router.delete("/:id", validJTW, deleteUserValidator, deleteUsuarios);

module.exports = router;
