const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

async function googleVerify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, picture, name } = ticket.getPayload();
  return {
    correo: email,
    img: picture,
    nombre: name,
  };
}

module.exports = {
  googleVerify,
};
