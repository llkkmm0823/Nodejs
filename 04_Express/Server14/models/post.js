// 모델명 : Post, 테이블명 : posts,   
// 필드 : content(문자140, null 허용안함), img(문자200, null 허용)
// user 와 1:N 관계표시 - user 모델 생성후 설정예정
// timestamp true, underscored false, paranoid false 나머지 기존 사항 그데로

const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            //기본키 적용된 id(자동생성), writer(외래키로 생성), 피드내용, 이미지가 들어갈 것
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
            timestamp:true,
            underscored:false,
            modelName:'Post',
            tableName:'posts',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany( db.Hashtag, {through:'PostHashtag'});
        //post 테이블과 hashtags 테이블의 N:N 관계를 위한 PostHashtag 테이블을 새롭게 생성 
        //posts(1) : PostHashtag(N), PostHashtag(N):hashtags(1) 두 관계를 통틀어 사용하여  N:N관계를 설정
        
        
    }
};