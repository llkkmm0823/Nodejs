const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);
// 클라이언트의 요청에 대한 응답을 별도의 파일에 넣어둔 라우터를 이용하여 응답할 예정
// 라우터를 종류별로 파일에 분산 운영

const indexRouter = require('./routers');  // 경로에 ./routers 만 써도 index.js 가 자동인식됩니다
const userRouter = require('./routers/users'); 

// 현재 파일에서 사용한 '/' 와 indexRouter  에 있는 '/' 와 조합이 됩니다
// '//' 가 '/' 로 사용이 됩니다
app.use('/', indexRouter);   
// indexRouter의 '/' 요청 -> http://localhost:3000/
// indexRouter의 '/about' 요청 -> http://localhost:3000/about

// 현재 파일에서 사용한 '/users' 와 userRouter 에 있는 '/' 와 조합되어
// '/users/' 가 사용됩니다.
app.use('/users', userRouter);
// userRouter '/' 요청 -> http://localhost:3000/users
// userRouter '/search' 요청 -> http://localhost:3000/users/search

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

