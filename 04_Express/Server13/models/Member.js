const Sequelize = require('sequelize');

// 클래스 형식으로 모델을 제작 -> 시퀄라이즈에 의해 테이블이 생성
// 별도로 exports 명령을 사용하지 않고, 생성과 동시에 exports 합니다
module.exports = class Member extends Sequelize.Model {
    static init( sequelize ){ 
        // 각 필드 정의
        return super.init(
            {
                // 필드정의
                userid:{
                    type:Sequelize.STRING(30),
                    allowNull:false,
                    primaryKey:true,
                    unique:true,
                }, // 특정 필드에 기본키 설정하면 자동으로 생성되는 id(일련번호)필드는 생성되지 않습니다.
                pwd:{
                    type:Sequelize.STRING(30),
                    allowNull:false,  
                },
                name:{
                    type:Sequelize.STRING(30),
                    allowNull:false,
                },
                phone:{
                    type:Sequelize.STRING(20),
                    allowNull:false,
                },
                email:{
                    type:Sequelize.STRING(50),
                    allowNull:false,
                },
                created_at:{
                    type:Sequelize.DATE,
                    allowNull:false,
                    defaultValue:Sequelize.NOW,
                }
            },
            {
                // 테이블의 형식 정의
                sequelize,        // 매개변수로 받은 sequelize 객체로 접속
                timestamps: false,    // created_at, updated_at 필드 생성여부
                modelName: 'Member',  // 모델이름
                tableName: 'members', // 데이터베이스에 생성되는 테이블이름
                paranoid: false,      // deleted_at 필드 생성여부
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            }
        );
    }
    static associate( db ){ 
        // 테이블간의 관계 설정
        db.Member.hasMany( db.Board, { sourceKey:'userid', foreingKey:'writer', onDelete:'cascade' });
        // hasMany 입장에서만 onDelte와 onUpdate 를 설정할수 있습니다.
        // userid는 수정할일 없기때문에 onUpdate 는 설정하지 않습니다.

        db.Member.hasMany( db.Reply, { sourceKey:'userid', foreignKey:'writer',  onDelete:'cascade' } );

    }
}