const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extensiones = ['.jpeg', '.jpg', '.gif', '.png', '.webp'];

const subirArchivo = (
  files,
  extensionesPermitidas = extensiones,
  carpeta = ''
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const extensionDeArchivo = path.extname(archivo.name);

    // Validar extension
    if (!extensionesPermitidas.includes(extensionDeArchivo)) {
      return reject(
        new Error(
          `La extension ${extensionDeArchivo} no es permitida - ${extensionesPermitidas}`
        )
      );
    }
    // Nombre unico UUID con extension
    const nombreUuid = uuidv4() + extensionDeArchivo;

    // Path donde se guardara el archivo
    const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreUuid);

    // Almacenamiento del archivo
    archivo.mv(uploadPath, function (err) {
      if (err) return reject(err);
      resolve(nombreUuid);
    });
  });
};

module.exports = {
  subirArchivo,
};
