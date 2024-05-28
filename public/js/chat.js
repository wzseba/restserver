// console.log(payload);
// btnSalir.onclick = () => {
//   socket.disconnect();
//   localStorage.clear();
//   window.location = 'index.html';
// };
/* eslint-disable no-undef */

let usuario = null;

//Referencias HTML
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
  // eslint-disable-next-line no-unused-vars
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
  socket.on('recibir-mensajes', () => {});
  socket.on('usuarios-activos', mostrarUsuarios);
  socket.on('mensaje-privado', () => {});
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

const main = async () => {
  await validarToken();
};

main();
