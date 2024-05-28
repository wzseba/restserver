const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const { createServer } = require('node:http');
const { socketController } = require('../sockets/controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = require('socket.io')(this.server);

    // Paths
    this.authPath = '/api/auth';
    this.buscarPath = '/api/buscar';
    this.categoriaPath = '/api/categoria';
    this.productoPath = '/api/producto';
    this.usuariosPath = '/api/usuarios';
    this.uploadPath = '/api/upload';

    // conexion a DB
    this.conectionDB();

    // middlewares
    this.middlewares();

    // rutas de app
    this.routes();

    // Sockets
    this.sockets();
  }

  async conectionDB() {
    await dbConnection();
  }

  middlewares() {
    // configuracion cors
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static('public'));

    // cargar archivo
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.buscarPath, require('../routes/buscar.routes'));
    this.app.use(this.categoriaPath, require('../routes/categoria.routes'));
    this.app.use(this.productoPath, require('../routes/producto.routes'));
    this.app.use(this.usuariosPath, require('../routes/usuario.routes'));
    this.app.use(this.uploadPath, require('../routes/upload.routes'));
  }

  sockets() {
    this.io.on('connection', socket => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ', this.port);
    });
  }
}

module.exports = Server;
