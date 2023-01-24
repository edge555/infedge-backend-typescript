const Sequelize = require("sequelize");
// db configuration
const config = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "123",
  DB: "infedge-ts",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  dialect: config.dialect,
  host: config.HOST,
  port: 5432,
  logging: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

module.exports = sequelize;
