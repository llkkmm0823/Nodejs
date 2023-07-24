// node 가 sequelize 를 이용해서 mysql 에 테이블을 생성하거나 조작할 수 있는 "테이블모델" 을 만듭니다
const Sequelize = require('sequelize');

// 테이블 모델을 class 형식으로 정의 합니다
// class 모델이름{ };

// 테이블을 위한 클래스 제작시 Sequelize에서 제공되는 Model 을 Extends 하여 제작합니다
// class 모델이름 extends Sequelize.Model {  };

// 그리고, 그 클래스가 exports되어서 index에서 require 해서 테이블을 생성합니다
// module.exports = class 모델이름 extends Sequelize.Model {};
// 모델이름 : 테이블이름과 같을수도 있고 다를수도 있습니다. 모델이름은 node에서 테이블을 제어하기위한 이름입니다

/*
module.exports = class User extends Sequelize.Model {
    // 테이블을 생성(필드생성)하고 초기화하는 함수
    static init( sequelize ){}   
    // 테이블간 관계 설정 함수
    static associate(db){ } 
};
*/

/*
module.exports = class User extends Sequelize.Model {
    static init( sequelize ){
        return super.init(
            {

            },
            {

            }
        );
    }   
    static associate(db){ } 
};
*/

// 외부에서 User를 require 하고 , User.init( Sequelize ); 이와 같이 호출될 예정입니다

module.exports = class User extends Sequelize.Model {
    static init( sequelize ){
        return super.init(
            {
                // 이곳에 필드들이 정의됩니다
                // 별도의 언급이 없으면, 기본키속성의 자동증가 숫자를 대상으로하는 id 라는 필드가 자동생성됩니다.
                name:{
                    type:Sequelize.STRING(20),
                    allowNull:false,   // null 허용?
                    unique:false,    // 중복불가?
                },
                age:{
                    type:Sequelize.INTEGER.UNSIGNED,
                    allowNull:false,
                },
                married:{
                    type:Sequelize.BOOLEAN,
                    allowNull:true,
                },
                comment:{
                    type:Sequelize.TEXT,
                    allowNull:true,
                },
                created_at:{
                    type:Sequelize.DATE,
                    allowNull:true,
                },
            },
            {
                // 테이블의 옵션들이 객체형식으로 정의됩니다.
                sequelize,   // init 함수의 매개변수에 전달된 sequelize
                timestamp:false, // 이 속성이 true 이면, createdAt, updatedAt  필드를 자동 생성합니다
                underscored:false, // 이속성이 true이면, createdAt, updatedAt 필드의 이름이 created_at, updated_at 으로 바뀝니다.
                modelName: 'User',   // Sequelize 가 사용할 모델(테이블)의 이름
                tableName : 'users',  // mysql 데이터베이스의 자체 테이블의 이름
                paranoid:false, // 이 멤버사  true  이면,  deletedAt 필드가 생성됩니다
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }   
    static associate(db){ 
        db.User.hasMany( db.Comment , { sourceKey:'id', foreignKey:'commenter' }  );
        // User 모델의 필드값이 Comment 모델에 같은 필드값으로 여러번 나오도록 설정(1:N 관계)
    } 
};