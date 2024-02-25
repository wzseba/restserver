const jwt = require('jsonwebtoken');

const generarJWT = uid => {
  try {
    const token = jwt.sign({ uid }, process.env.SECRET_KEY, {
      expiresIn: '15m',
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error('Error al generar token');
  }
};

module.exports = {
  generarJWT,
};
