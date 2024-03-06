const googleVerify = require('./googleVerifyToken');
const hasPass = require('./hashPass');
const jsonWebToken = require('./jsonWebToken');
const uploadFile = require('./uploadFile');

module.exports = {
  ...googleVerify,
  ...hasPass,
  ...jsonWebToken,
  ...uploadFile,
};
