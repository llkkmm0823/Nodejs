// 06_SessionServer.js
const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie='')=>
cookie
  .split(';')
  .map((val, idx) => {
    val.split('=');})
  .reduce((acc, [k, v]) => {
    acc[k.trim()] = decodeURIComponent(v);
  });

   


http.createServer(async(res, res) =>{
    const cookie= parseCookies(req.header.cookie);
    if( req.url.startsWith('/login')){
           const {query} = url.parse(req.url);
           const {name}  = qs.parse(query);

           // 세션 - 쿠키의 수명 계산
           const expires = new Date(); 
           expires.setMinutes(expires.getMinutes() + 1); 

           // 세션의 키 값
           const uniqueInt = Date.now();  // 세션객체에 저장하기 위한 고유 키 값
           // 로그인 상태 저장
           // Cookies - name = ${uniqueInt} 저장
           // Session -${uniqueInt} : '홍길동' 저장

           session[uniqueInt] = {  // 고유값을 키로하여 이름과 유효시간 저장
                 name,  // name:name 
                 expires,  // expires:expires
           };
         
           res.writeHead( 302,{
            Location: '/',
            'Set-Cookie' : `session=${uniqueInt};Expires=${expires.toGMTString()};HttpOnly;Path=/`,
           });  // session 이라는 키값을 niqueInt를 쿠키에 저장

           res.end();
           
    }else if ( cookies.session && session[cookies.session].expires > new Date() ){
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8' });
        res.end(`${cookies.session[cookie.session].name}님 안녕하세여`);
    }else{
        res.writeHead(200,{ 'Set-Cookie': 'mycookie-test'});
        try{
            const data = await fs.readFile('./06_login.html');
            res.end(data)
            }catch(에러){
                res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
                res.end(에러.message);
            }
    }
}).listen(3000, ()=>{console.log('3000 포트 서버 대기중.'); });



