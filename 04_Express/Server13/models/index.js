const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 테이블에 대한 모델 require  (Member, Board, Reply)
const Member = require('./Member'); // 클래스를 require 
const Board = require('./Board');
const Reply = require('./Reply');

db.Member = Member; // 클래스를 db 객체에 넣고
db.Board = Board; 
db.Reply = Reply;

Member.init(sequelize);  // init 와 associate를 호출. 실행
Board.init(sequelize);  
Reply.init(sequelize);  

Member.associate(db);
Board.associate(db);
Reply.associate(db);

module.exports = db;
