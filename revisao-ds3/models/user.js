function User(sequelize, DataType) {
    const attributes = {
      
      email: {
        type: DataType.STRING,
        allowNull: false // Não permite valores nulos
      },

      password: {
        type: DataType.STRING,
        allowNull: false,
      }
    };
    
    const options = {};

    return sequelize.define('user', attributes, options);
  }
  
  module.exports = User;