// App.js
// 서버운영을 위해서 express 모듈을  import 해서 express 변수에 저장
const express = require('express');
const app = express();   // express() 함수를 이용해서 서버관련 객체를 변수에 저장

// app.set(); : 서버객체의 필드 변수를 추가해서 사용할 수 있는데, 추가된는 변수는 현재 파일에서만 사용이 되고, 서버 종료시 소멸됩니다
app.set('port', process.env.PORT || 3000);  // 3000 포트 또는 현행 시스템 포트
// console.log( app.get('port') );

// 현재 위치에 클라이언트의 각 요청에대한 응답을 할 라우터가 작성됩니다.
// if문사용 하지 않습니다
app.get('/' , (req, res)=>{
    res.send('<h1>Hello, Express</h1>');
}); 
//app.get('/', ()=>{}); 와 같이 클라이언트 요청에 매칭되어 응답하는 이함수를 "라우터"라고 부릅니다
// get-method    '/'-url
app.get('/about' , (req, res)=>{
    res.send('<h1>About Page~!!</h1>');
});

app.listen( app.get('port') , ()=>{ console.log( app.get('port'), "포트에서 서버 대기중..."); } );
// 서버 구동에 핵심이 되는 파일 app.js  중요 메서드
// app.set(‘port’, 포트)로 서버가 실행될 포트 지정
// app.get(‘port’)로 저장되어 있는 포트번호 활용
// app.get(‘키워드’, 익명함수)로 GET 요청이 올 때 어떤 동작을 할지 지정
// app.listen(‘포트’, 익명함수)으로 몇 번 포트에서 서버를 실행할지 지정
// express 서버 구동 순서---------------------------------------------------
// 1. npm init
// 2. npm i express
// 3. npm i nodemon  : 개발환경용 이므로 필수 사항은 아닙니다
// 4. app.js 또는 index.js 또는 main에 지정한 파일(서버의 시작파일)을 제작합니다
// 5. package.json 의 scripts 에 "start":"nodemon app" 를 추가합니다.
// 6. npm app  또는  npm run start(npm start) 로 서버를 시작합니다.
// nodemon을 사용하면 좋은점-------------------------------------------------
// 1. 서버구동 및 운용에 발생한 모든 과정을 로깅으로 보여줍니다.
// 2. 에러수정이 용이합니다
// 3. 일정시간이 지나거나 주요파일이 저장되면 서버가 다시 시작되므로 수정사항이 서버 수동 재시작없이 적용이 가능합니다