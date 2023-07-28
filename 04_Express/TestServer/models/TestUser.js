const Sequelize = require('sequelize');

module.exports = class TestUser extends Sequelize.Model {
    static init( sequelize ){ 
        return super.init(
            {
                userid: {
                    type:Sequelize.STRING(30), 
                    allowNull: false, 
                    unique: true 
                  },
                  pwd: {
                    type:Sequelize.STRING(30),
                    allowNull: false
                  },
                  name: {
                    type:Sequelize.STRING(30),
                    allowNull: false
                  }
            },
            {
                sequelize,
                modelName: 'TestUser',
                tableName: 'test_users',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            }
        );
    }
};