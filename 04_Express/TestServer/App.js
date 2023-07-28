const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use( express.static(path.join(__dirname, 'public'))); // 스태틱 폴더설정

const dateFilter = require('nunjucks-date-filter'); 
app.set('view engine', 'html');
let env = nunjucks.configure('views', {express: app, watch: true, });
env.addFilter('date', dateFilter);

app.use(cookieParser());
app.use(session({ resave:false,  saveUninitialized:false,  secret:"rkdgmlwns", }));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const indexRouter = require('./routers');
const membersRouter = require('./routers/members');
app.use('/', indexRouter);
app.use('/members', membersRouter);



// 데이터베이스에 대한 설정
const { sequelize } = require('./models');

sequelize.sync({ force:false })
.then(()=>{ console.log('데이터베이스 연결성공');})
.catch((err)=>{ 
    console.error(err);
});


app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.error(err);
    res.render('error');
});

app.listen(app.get('port'),()=>{console.log(app.get('port'), ' 포트에서 대기중'); });