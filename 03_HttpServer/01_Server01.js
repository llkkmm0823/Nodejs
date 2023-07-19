// Node.js에 포함된 기능과 문법을 이용해서  웹호스팅을 할 수 있는 서버를 구축합니다

// Node 가 제공하는  라이브러리중 서버 구축에 필요한 기능과 함수를 담고 있는 http 모듈(객체)을 require  합니다
const http=require('http');
// require : 외부에서 공유한 모듈을 불러와서 사용할수 있게 하는 node.js 의 문법이며, 잘 알고 있는 import 의 의미가 담겨있는 명령입니다.
// http 모듈의 내용을 불러와서  http 라는 변수에 저장하여 사용합니다.
// 객체형식으로 불러와서 저장한형태이므로  http.함수이름(),  http.변수이름  처럼 사용합니다

// http.createServer();
// createServer 함수 : Node.js 자바스크립트로 만든 http 서버가 실행되게 하는 함수입니다

// (req, res)=>{ } : 서버에 클라이언트가 요청이 있을때 실행할 명령들이 들어갑니다
// http.createServer(  (req, res)=>{ } );

http.createServer((req, res)=>{
    // req 는 요청을 받고,  res 는 응답을 합니다
    res.write( '<h1>Hellow Node Server!!</h1>' );
    res.write( '<h2>Wellcome to My Node Server!!</h2>' );
}).listen( 3000, ()=>{ console.log('3000포트에서 서버가 오픈되었습니다'); }  );

//const ser = http.createServer();
//ser.listen( 3000, ()=>{console.log('3000포트에서 서버가 오픈되었습니다');} );
// 3000은 포트번호,  익명함수는 서버 오픈과 동시에 실행할 명령들이 들어갑니다.
