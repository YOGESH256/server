const { DATABASE } = require("../config/database");

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user',
    {


         
         first_name: DataTypes.STRING,
         last_name:DataTypes.STRING,
         mobile_number : DataTypes.STRING,
         email: DataTypes.STRING,
         

    },
    {
        freezeTableName: true
    });

    return User;
}
