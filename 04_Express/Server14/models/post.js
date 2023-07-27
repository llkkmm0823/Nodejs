const { Sequelize } = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init( sequelize ){
        return super.init(
            {   
                // 기본키 적용된 id(자동생성), writer(외래키로 생성), 피드내용, 이미지
                content:{
                    type:Sequelize.STRING(200),
                    allowNull:false,
                },
                img:{
                    type:Sequelize.STRING(200),
                    allowNull:true,
                },
            },{
                sequelize,
                timestamps:true,
                underscored:false,
                modelName:'Post',
                tableName:'posts',
                paranoid:true,
                charset:'utf8mb4',
                collate:'utf8mb4_general_ci',
            }
        );
    }
    static associate(db){
        db.Post.belongsTo( db.User );
        db.Post.belongsToMany( db.Hashtag, {through:'PostHashtag'} );
        // posts 테이블과 hashtags 테이블의  N:N 관계를 위한 PostHashtag 테이블을 새롭게 생성합니다. posts(1) : PostHashtag(N),   PostHashtag(N):hashtags(1)  두 관계를 통틀어서 사용하여 N:N 관계를 설정합니다.
        // PostHashtag 테이블의 필드명은 각 테이블의 id 와 같은 이름이 사용될예정입니다.
    }
};