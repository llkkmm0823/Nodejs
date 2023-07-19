// 06_CookieServer02.js
const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');
const { parse } = require('path');


// 로그인페이지에서 로그인을 하면 요청되는 주소 
// http://localhost:3000/login?name=scott

// let name='홍길동';
// let login = false;

const parseCookies = (cookie='')=>
cookie  .split(';') // 두 개이상의 쿠키가 있을 수 있으므로 ';'로 구분하여 배열로 저장
        .map( (v)=>v.split('='))   // ';'으로 분리된 쿠키들은 = 기준으로 분리해서 저장
        .reduce( (acc, [k,v])=>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        },{ }); //인코딩으로 저장한 쿠키값을 다시 디코딩해서 저장

http.createServer( async (req, res)=>{
    //쿠키의 내용은 요청(request)이 있을 때마다 매번 헤더에 동봉되어져 서버로 옴
    //console.log(req.headers.cookie);
    console.log("1.",req.headers.cookie);
    const cookies = parseCookies(req.headers.cookie);
    console.log("2.",cookies);
    if( req.url.startsWith('/login') ){
        // 로그인하려는 유저의 전송된 이름을 쿠키에 저장하고  '/' 로 이동
        //console.log(req.url); // /login?name=hong
        const { query } = url.parse(req.url); // req.url에서 ?이후 쿼리만 뽑아낸것 = name=hong
        //console.log(query);
        const { name } = qs.parse(query); // =이후만 뽑아낸 것  = hong
        //console.log(name);

        const expires = new Date();  // 오늘 날짜 현재 시간 생성 저장
        expires.setMinutes(expires.getMinutes() + 1);  // 오늘날짜 현재시간 + 1분
        res.writeHead( 302, { 
            Location:'/',  
            'Set-Cookie' : `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()};HttpOnly;Path=/`,
        });  // ▲  쿠키에 원하는 정보를 심는 동작
        login = true;
        console.log(login);
        res.end();
    }else if( cookies.name ){  // 첫페이지이거나 로그인후에 다시 돌아거나
        // 쿠키에 로그인정보가 저장되어 있는지 확인한후  '홍길동님 방갑습니다' 를 표시
        
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`${cookies.name}님 안녕하세요`); 
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