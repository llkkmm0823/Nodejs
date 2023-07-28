const { Sequelize } = require('sequelize');

module.exports = class LoginUser extends Sequelize.Model{
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
                modelName : 'LoginUser',
                tableName : 'loginusers',    
                paranoid : true,
                charset : 'utf8mb4',
                collate : 'utf8mb4_general_ci',
            }
        );
    }
};