const bcryptjs = require('bcryptjs');

const encryptPassword = pass => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(pass, salt);
};

module.exports = {
  encryptPassword,
};
