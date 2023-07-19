// App.js
// 서버 운영을 위해서 express 모듈을 import 해서 express 변수에 저장
const express = require('express');
const app = express(); // express() 함수를 이용해서 서버관련 객체를 변수에 저장

// #app.set();  서버 객체의 필드 변수를 추가해서 사용할 수 있는데, 추가되는 변수는 현재 파일에서만 사용이 되고,
// 서버 종료시 소멸됨.
app.set('port', 3000);
// console.log(app.get('port'));



// 현재 위치에 클라이언트의 각 요청에 대한 응답을 할 라우터가 작성됨.
// if문 사용하지 않음.
app.get('/' ,(req,res )=>{ // 라우터로써의 get
      res.send('<h1>Hello, Express</h1>');
});  




app.listen( app.get('port'), ()=>{ console.log( app.get('port'), "포트에서 서버 대기중"); });  // 변수로써의 get