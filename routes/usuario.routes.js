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
} = require("../validators/usuariosValidator");

const router = Router();

router.get("/", getUsuarios);

router.put("/:id", putUserValidator, putUsuarios);

router.post("/", postUserValidator, postUsuarios);

router.delete("/:id", deleteUsuarios);

router.patch("/", patchUsuarios);

module.exports = router;
