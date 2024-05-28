const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');
const { ChatMensaje } = require('../models');

const chatMensajes = new ChatMensaje();

const socketController = async (socket = new Socket(), io) => {
  const usuario = await comprobarJWT(socket.handshake.headers['x-token']);

  if (!usuario) {
    return socket.disconnect();
  }

  // Agregar el usuario conectado
  chatMensajes.conectarUsuario(usuario);
  io.emit('usuarios-activos', chatMensajes.usuariosArray);

  // Limpiar usuario cuando se desconecta
  socket.on('disconnect', () => {
    chatMensajes.desconectarUsuario(usuario.id);
    io.emit('usuarios-activos', chatMensajes.usuariosArray);
  });
};

module.exports = { socketController };
