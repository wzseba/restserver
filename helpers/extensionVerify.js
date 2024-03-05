const path = require('path');

const extensionPermitida = file => {
  try {
    const extensionDeArchivo = path.extname(file.name);

    const extensionesPermitidas = ['.jpeg', '.jpg', '.gif', '.png', '.webp'];

    if (!extensionesPermitidas.includes(extensionDeArchivo)) {
      throw new Error('Extensión no permitida');
    }
  } catch (error) {
    throw new Error(
      'Error al verificar la extensión del archivo: ' + error.message
    );
  }
};

module.exports = {
  extensionPermitida,
};
