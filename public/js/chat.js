/* eslint-disable no-undef */

let usuario = null;

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
};

const main = async () => {
  await validarToken();
};

main();
