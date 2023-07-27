const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

const app = express();

app.set('port', process.env.PORT || 3000);
const dateFilter = require('nunjucks-date-filter'); 
app.set('view engine', 'html');
let env = nunjucks.configure('views', {express: app, watch: true, });
env.addFilter('date', dateFilter);
app.use( express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({ resave:false,  saveUninitialized:false,  secret:"rkdgmlwns", }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const TextUser = require('../models/TextUser');

const firstRouter = require('./routers/first');
app.use('/', firstRouter);
const loginRouter = require('./routers/members');
app.use('/members', loginRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

const { sequelize } = require('./models');

sequelize.sync({ force:false })
.then(()=>{ console.log('데이터베이스 연결성공');})
.catch((err)=>{ 
    console.error(err);
});

app.listen(app.get('port'),()=>{console.log(app.get('port'), ' 포트에서 대기중'); });
