const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = '/api/auth';
    this.buscarPath = '/api/buscar';
    this.categoriaPath = '/api/categoria';
    this.productoPath = '/api/producto';
    this.usuariosPath = '/api/usuarios';

    // conexion a DB
    this.conectionDB();

    // middlewares
    this.middlewares();

    // rutas de app
    this.routes();
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
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.buscarPath, require('../routes/buscar.routes'));
    this.app.use(this.categoriaPath, require('../routes/categoria.routes'));
    this.app.use(this.productoPath, require('../routes/producto.routes'));
    this.app.use(this.usuariosPath, require('../routes/usuario.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ', this.port);
    });
  }
}

module.exports = Server;
