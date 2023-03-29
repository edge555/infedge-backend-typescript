export {};
const sequelize = require('./dbConnect');

const db = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('The connection established...');
  } catch (error) {
    console.error('The connection is unsuccessful: ', error);
  }
};

module.exports = db;
