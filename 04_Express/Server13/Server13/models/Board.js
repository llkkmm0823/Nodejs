const Sequelize = require('sequelize');
module.exports = class Board extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
               subjext:{  type:Sequelize.STRING(100),
                          allowNull:false,},
               content:{  type:Sequelize.STRING(1000),
                          allowNull:false,
                          defaultValue:0,   
                        },
               readCount:{type:Sequelize.INTEGER.UNSIGNED,
                          allowNull:false,
                          defaultValue:0, 
                        },
               created_at:{type:Sequelize.DATE,
                           allowNull:true,
                           defaultValue:Sequelize.fn('NOW'),},
               filename:{type:Sequelize.STRING(100),
                         allowNull:true,},
               realfilename:{type:Sequelize.STRING(100),
                             allowNull:true,},

            },
            {
                sequelize,          
                timestamps: false,  
                modelName: 'Board',   
                tableName: 'boards',  
                paranoid: false,     
                charset:'utf8mb4',
                collate:'utf8mb4_general_ci'
            }
        );
    }
    static associate( db ){
          // 테이블간의 관계 설정
          db.Board.belongsTo( db.Member,{ targetkey:'userid' , foreignkey:'writer'});
          db.Board.hasMany( db.Reply,{ sourcekey:'id' , foreignkey:'boardnum',onDelete:'cascade'});
    }
}