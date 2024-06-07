/* eslint-disable no-undef */
let usuario = null;
// Referencias HTML
const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

// Ver window.location.hostname.includes('localhost')
const url = 'http://localhost:8080/api/auth/';

// Validar token
const validarToken = async () => {
  const token = localStorage.getItem('token') || '';

  if (token.length <= 10) {
    window.location = 'index.html';
    throw new Error('No hay token en el servidor');
  }

  const resp = await fetch(url, {
    headers: { 'x-token': token },
  });

  const { usuario: usuarioDB, token: tokenDB } = await resp.json();
  console.log(usuarioDB, tokenDB);
  // Renovar token
  localStorage.setItem('token', tokenDB);
  usuario = usuarioDB;

  // Asigno el nombre del usuario
  document.title = usuario.nombre;

  await conectarSocket();
};

const conectarSocket = async () => {
  // eslint-disable-next-line no-unused-vars, no-undef
  const socket = io({
    extraHeaders: {
      'x-token': localStorage.getItem('token'),
    },
  });

  socket.on('connect', () => {
    console.log('online');
  });
  socket.on('disconnect', () => {
    console.log('offline');
  });
  socket.on('recibir-mensajes', mostrarMensajes);
  socket.on('usuarios-activos', mostrarUsuarios);
  socket.on('mensaje-privado', () => {});

  // Solo registrar el evento `keyup` cuando `socket` esté listo
  txtMensaje.addEventListener('keyup', ({ keyCode }) => {
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;

    if (keyCode !== 13) {
      return;
    }
    if (mensaje.length === 0) {
      return;
    }

    socket.emit('enviar-mensaje', { mensaje, uid });
    txtMensaje.value = ''; // Limpiar el campo de texto después de enviar el mensaje
  });
};

const mostrarUsuarios = (usuarios = []) => {
  let usersHtml = '';

  usuarios.forEach(({ nombre, uid }) => {
    usersHtml += `
    <li>
    <p>
    <h5 class="text-success">${nombre}</h5>
    <span class="fs-6 text-muted">${uid}</span>
    </p>
    </li>`;
  });
  ulUsuarios.innerHTML = usersHtml;
};

const mostrarMensajes = mensajes => {
  let mensajeHtml = '';

  mensajes.forEach(({ nombre, mensaje }) => {
    mensajeHtml += `
    <li>
    <p>
    <span class="text-primary">${nombre} :</span>
    <span>${mensaje}</span>
    </p>
    </li>`;
  });
  ulMensajes.innerHTML = mensajeHtml;
};

const main = async () => {
  await validarToken();
};

main();
