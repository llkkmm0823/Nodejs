// 03_Server03.js
const http = require('http');
// 한번에 여러개의 서버를 실행합니다
// 방법은 createServer 를 여러번 호출하는 방식으로 진행합니다
// 단, 두서버의 포트를 다르게 지정해야합니다. 포트번호가 충돌하면  에러가 발생합니다
http.createServer((req, res)=>{
    res.write('<h1>Hello Node Server #1!</h1>');// 응답 내용의 본문 전송
    res.end('<p>Hello Server!</p>');// 응답 내용의 마지막 전송 : res.end 실행후에는 더이상 응답내용이  전송될 수 없습니다.
}).listen(3001, () => {  console.log('3001 포트에서 서버 대기 중입니다!');  });
// 매개 변수이고, 서버에 있는 실제  request , response 객체가 전달됩니다
// 매개 변수는 그 객체를 전달받아 사용하는 것으로 변수의 아름은 자유롭게 변경이 가능합니다. 다만 함수 내에서 변경된 이름을 일관되게 사용해주는게 중요합니다 
http.createServer((req, res)=>{
    res.write('<h1>Hello Node Server #2!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(3002, () => { console.log('3002 포트에서 서버 대기 중입니다!'); });