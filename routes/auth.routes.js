const { Router } = require('express');
const {
  loginUsuarios,
  googleSignIn,
  renovarToken,
} = require('../controllers/auth.controller');
const {
  postAuthValidator,
  authGoogleSignIn,
} = require('../validators/authValidators');
const { validJTW } = require('../middlewares/jwtVerifications');

const router = Router();

router.post('/login', postAuthValidator, loginUsuarios);
router.post('/google', authGoogleSignIn, googleSignIn);
router.get('/', validJTW, renovarToken);

module.exports = router;
