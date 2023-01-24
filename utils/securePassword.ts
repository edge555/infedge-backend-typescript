const bcrypt = require('bcryptjs');

const securePassword = async (password: any) => {
  const salt = await bcrypt.genSaltSync(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
module.exports = securePassword;
