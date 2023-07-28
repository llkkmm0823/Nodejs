const { Sequelize } = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init( sequelize ){
        return super.init(
            {   // 자동증가 및 기본키 필드 'id' 자동 생성(default)
                email : {   // 일반 회원가입 사용자용 사용자식별 필드
                    type : Sequelize.STRING(50),
                    allowNull : true,
                    unique : true,  // null 값끼리는 고유값적용을 하지 않습니다.
                },
                nickname : {
                    type : Sequelize.STRING(30),
                    allowNull : false,
                },
                password : {
                    type : Sequelize.STRING(200),
                    allowNull : true,
                },
                provider : {
                    type : Sequelize.STRING(20),
                    allowNull : false,
                    defaultValue : 'local',
                },
                snsid : {
                    type : Sequelize.STRING(30),
                    allowNull : true,
                },
            },
            {
                sequelize,
                timestamps : true,
                underscored : false,
                modelName : 'User',
                tableName : 'users',    
                paranoid : true,
                charset : 'utf8mb4',
                collate : 'utf8mb4_general_ci',
            }
        );
    }
    static associate( db ){
        db.User.hasMany( db.Post );
        // hasMany 와 belongsTo 사이에 targetKey, sourceKey, foreignKey 들을 지정하지 않으면 hasMany의 주인공테이블(User)의 기본키가 belongsTo의 주인공테이블(Post)의 외래키로 삽입됩니다.
        // 이 때 삽입되는 필드명은 user테이블의 id 라는 뜻으로 Userid 가 됩니다.
        db.User.belongsToMany(db.User, {foreignKey:'followingId', as:'Followers', through:'Follow'});
        db.User.belongsToMany(db.User, { foreignKey:'followerId', as:'Followings', through:'Follow'});
        // 테이블 이름 : Follow
        // 필드명 : followingId, followerId
        // User 테이블로 부터 Follow 테이블에 접근할때는 Followers 와 Followings 로 접근합니다.
    }
};