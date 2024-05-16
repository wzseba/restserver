/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// Referencia al formulario
const miFormulario = document.querySelector('form');
const url = 'http://localhost:8080/api/auth/';

// Formulario sin google
miFormulario.addEventListener('submit', e => {
  e.preventDefault();

  const formData = {};

  for (const el of miFormulario.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url + 'login', {
    method: 'POST',
    headers: {
      key: 'Cross-Origin-Opener-Policy',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(({ msg, token }) => {
      if (msg) {
        console.log(msg);
      }
      localStorage.setItem('token', token);
      window.location = 'chat.html';
    })
    .catch(console.warn);
});

// Formulario con google
function handleCredentialResponse(response) {
  const body = { idToken: response.credential };

  fetch(url + 'google', {
    method: 'POST',
    headers: {
      key: 'Cross-Origin-Opener-Policy',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(({ msg, token }) => {
      if (msg) {
        console.log(msg);
      }
      localStorage.setItem('token', token);
      window.location = 'chat.html';
    })
    .catch(console.warn);
}

const button = document.getElementById('googleSignout');
button.onclick = () => {
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem('email'), done => {
    localStorage.clear();
    location.reload();
  });
};
