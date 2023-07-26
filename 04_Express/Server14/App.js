const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const dateFilter = require('nunjucks-date-filter'); 
const morgan = require('morgan'); 

const app = express();
app.set('port', process.env.PORT || 3000);
dotenv.config();
app.set('view engine', 'html'); 
let env = nunjucks.configure('views', {express: app, watch: true, });
env.addFilter('date', dateFilter);
app.use(morgan('dev'));
app.use( express.static(path.join(__dirname, 'public')));
app.use( 'img',express.static(path.join(__dirname,'uploads')));

app.use(express.json());  
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({ 
    resave:false,  
    saveUninitialized:false,  
    secret:process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
 })); 
 //한명의 사용자에 의해 세션이 한 개 이상 값이 저장되면 그 값을 사용하는 클라이언트를 구분할 수 있는 쿠키가 자동으로 클라이언트에
 //심어지는 쿠키에 대한 설정
 //세션값이 삭제되거나 브라우저 닫히면 쿠키값도 사라짐


 const pageRouter = require('./routers/page');
 const postRouter = require('./routers/post');
 const authRouter = require('./routers/auth');
 const userRouter = require('./routers/user');
 app.use('/', pageRouter);
 app.use('/post', postRouter);
 app.use('/auth', authRouter);
 app.use('/user', userRouter);
//  app.get('/',(req,res)=>{
//     res.send('<h1>Node Gram</h1>');
//  });

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
    res.send('error');
    //res.render('error');
});

const { sequelize } = require('./models');

sequelize.sync({ force:false })
.then(()=>{ console.log('데이터베이스 연결성공');})
.catch((err)=>{ 
    console.error(err);
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), ' 포트에서 대기중'); 
});








