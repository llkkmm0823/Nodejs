const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
// 현재위치에서 한단계 상위폴더로 가서 config 폴더에 있는 config.json 파일을 require
// [env] :  필드키값이 'development' 인 항목을 require
const config = require( __dirname + '/../config/config.json')[env];
const User = require("./user");  // User 클래스 require
const Comment = require("./comment"); // Comment 클래스 require

const db = {};
let sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;  // 접속정보 저장된 객체
db.Sequelize = Sequelize;  // sequelize 기능이 있는 객체
// db = { sequelize:sequelize,  Sequelize:Sequelize };
// db = { sequelize,  Sequelize };

db.User = User;   // db 테이블 객체에 삽입
db.Comment = Comment; // db 테이블 객체에 삽입

User.init(sequelize);   // 테이블 생성 및 초기화함수 호출
Comment.init(sequelize);
User.associate(db);
Comment.associate(db);

module.exports = db;
