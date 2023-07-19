// 06_CookieServer02.js
const http = require('http');
const fs = require('fs').promises;

// 로그인페이지에서 로그인을 하면 요청되는 주소 
// http://localhost:3000/login?name=scott

http.createServer( async (req, res)=>{
    let name='홍길동';
    let login = false;

    if( req.url.startsWith('/login') ){
        // 로그인하려는 유저의 전송된 이름을 쿠키에 저장하고  '/' 로 이동
        // console.log(name);
        const expires = new Date();  // 오늘 날짜 현재 시간 생성 저장
        expires.setMinutes(expires.getMinutes() + 1);  // 오늘날짜 현재시간 + 1분
        res.writeHead( 302, { 
            Location:'/',  
            'Set-Cookie' : `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()};HttpOnly;Path=/`,
        });  // ▲  쿠키에 원하는 정보를 심는 동작
        login = true;
        // console.log(login);
        res.end();
    }else if( login ){  // 첫페이지이거나 로그인후에 다시 돌아거나
        // 쿠키에 로그인정보가 저장되어 있는지 확인한후  '홍길동님 방갑습니다' 를 표시
        
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`${name}님 안녕하세요`); 
    }else{
            try{
                const data = await fs.readFile('./06_Login.html');
                res.end(data);
            }catch(e){
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' } );
                res.end(e.message);
            }
    }

}).listen(3000, () => {  console.log('3000 포트에서 서버 대기 중');  });