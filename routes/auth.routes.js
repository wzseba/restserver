const { Router } = require('express');
const {
  loginUsuarios,
  googleSignIn,
} = require('../controllers/auth.controller');
const {
  postAuthValidator,
  authGoogleSignIn,
} = require('../validators/authValidators');

const router = Router();

router.post('/login', postAuthValidator, loginUsuarios);
router.post('/google', authGoogleSignIn, googleSignIn);

module.exports = router;
