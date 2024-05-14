// const socket = io();

let usuario = null;
let socket = null;

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
};

const main = async () => {
  await validarToken();
};

main();
