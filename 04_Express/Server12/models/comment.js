const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init( sequelize ){
        return super.init(
            {
                // 4개의 필드가 생성됩니다
                // id(기본키의 고유넘버), commenter(글쓴이), comment(글내용), created_at(쓴날짜시간)
                
                // id :  별도의 언급이 없으면 증가되는 고유숫자로 구성된 필드로 자동생성됩니다.

                // commenter : 글쓴사람의 id, users 테이블의 id 값과 외래키관계입니다. 따로 commenter 필드를 만들고 외래키설정을 하는게 아니라, 외래키 설정하면  자동으로 필드가 삽입됩니다.

                comment:{
                    type:Sequelize.STRING(100),
                    allowNull:false,
                },
                created_at:{
                    type:Sequelize.DATE,
                    allowNull:true,
                    defaultValue:Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamp:false, 
                underscored:false, 
                modelName: 'Comment',
                tableName : 'comments', 
                paranoid:false, 
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }   
    static associate( db ){ 
        // comment 테이블의 commenter 와  user의  id와 외래키
        db.Comment.belongsTo( db.User, { targetKey:'id', foreignKey:'commenter'} );
        // comment 테이블이 user 테이블의 id 값으로 commenter 필드를 참조합니다.
    } 
}