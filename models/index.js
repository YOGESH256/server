const dbConfig = require('../config/database');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    port:dbConfig.PORT,
    dialectOptions: {
      encrypt: true,
      
    },
});



const db = {};
db.sequelize = sequelize;




db.models = {};
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);





module.exports = db;
