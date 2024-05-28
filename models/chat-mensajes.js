class Mensajes {
  constructor(uid, nombre, mensaje) {
    this.uid = uid;
    this.nombre = nombre;
    this.mensaje = mensaje;
  }
}

class ChatMensaje {
  constructor() {
    this.mensajes = [];
    this.usuarios = {};
  }

  get ultimosDiezMensajes() {
    this.mensajes = this.mensajes.splice(0, 10);
    return this.mensajes;
  }

  get usuariosArray() {
    /* [{},{},{}]*/
    return Object.values(this.usuarios);
  }

  enviarMensaje(uid, nombre, mensaje) {
    this.mensajes.unshift(new Mensajes(uid, nombre, mensaje));
  }

  conectarUsuario(usuario) {
    this.usuarios[usuario.id] = usuario;
  }

  desconectarUsuario(id) {
    delete this.usuarios[id];
  }
}

module.exports = ChatMensaje;
