const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);

// 클라이언트의 요청에 대한 응답을 별도의 파일에 넣어둔 라우터를 이용하여 응답할 예정입니다. 
// 라우터를 종류별로 파일에  분산 운영
const indexRouter = require('./routers');  
// 경로에 ./routers 만 써도 index.js 가 자동인식됩니다
const userRouter = require('./routers/users'); 

// 앞으로 요청되는 모든 '/' 관련 요청은   indexRouter 와 연결되어 응답합니다
app.use('/', indexRouter); 
// '/' 요청 -> http://localhost:3000/   
//      -> App.js의'/' 와 index.js'/'가  합쳐지면서 '/' 로 라우팅
// '/about' 요청 -> http://localhost:3000/about
//      -> App.js의'/' 와 index.js'/about'가  합쳐지면서 '/about' 로 라우팅
// 위와 같은 요청들의 라우터들은 index.js에 분리되어 운영됩니다


// '/'로 시작하는 요청중에서도   '/users' 로 시작하는 것들은 users.js 에 분리되어 운영됩니다
app.use('/users', userRouter);
//  '/users' 요청 -> http://localhost:3000/users
//  '/users/search' 요청 -> http://localhost:3000/users/search
//  '/users'로 시작하는 모든 요청

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});