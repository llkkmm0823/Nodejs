const Sequelize = require('sequelize');


class TextUser extends Sequelize.Model {
  static init(sequelize) { 
    return super.init(
      {
        userid: {
          type: Sequelize.STRING(30),
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        pwd: {
          type: Sequelize.STRING(30),
          allowNull: false,  
        }
      },
      {
        sequelize,     
        timestamps: false,    
        modelName: 'TextUser',  
        tableName: 'TextUser',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    );
  }
}

module.exports = TextUser;