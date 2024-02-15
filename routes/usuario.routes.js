const { Router } = require("express");
const {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
  patchUsuarios,
} = require("../controllers/usuario.controller");
const { postUserValidator } = require("../validators/postUsuariosValidator");

const router = Router();

router.get("/", getUsuarios);

router.put("/", putUsuarios);

router.post("/", postUserValidator, postUsuarios);

router.delete("/", deleteUsuarios);

router.patch("/", patchUsuarios);

module.exports = router;
