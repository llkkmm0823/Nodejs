// 06_CookieServer02.js
const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');
// 로그인페이지에서 로그인을 하면 요청되는 주소  http://localhost:3000/login?name=scott
// let login = false;
// let name='홍길동';

const parseCookies = ( cookie='' )=>{
    // 두개이상의 쿠키가 있을수 있으므로 ';' 로 구분하여 배열로 저장합니다
    // 전달된 쿠키 "mycookie=test; name=scott"
    let c = cookie.split(';');
    console.log("split ; " , c);   
    // ; 으로 분리한 결과    [ 'mycookie=test', ' name=scott' ]
    let d = c.map( (v)=>{
        let a = v.split('=');
        return a;
    } );
    console.log("split = " , d);    
    //  = 로 분리한 결과     [ [ 'mycookie', 'test' ], [ ' name', 'scott' ] ]
    let e = d.reduce( (acc,  [k, v])=>{
        acc[k.trim()] = decodeURIComponent(v);
        return acc
    } , { });
    console.log(e);  
    //  분리된 결과들은  키:값 형태로  객체로 변환
    // { mycookie: 'test', name: 'scott' }
    return e;
}
http.createServer( async (req, res)=>{
    // 쿠키의 내용은 요청(request)이 있을때마다 매번 헤더에 동봉되어져서 서버로 옵니다
    console.log("1." ,req.headers.cookie);  //mycookie=test; name=scott
    const cookies = parseCookies( req.headers.cookie );
    //console.log("2." , cookies);

    if( req.url.startsWith('/login') ){
        // 로그인하려는 유저의 전송된 이름을 쿠키에 저장하고  '/' 로 이동
        // console.log(req.url);  //   /login?name=hong
        const { query } = url.parse(req.url);  // req.url 에서 ? 이후를 분리
        // console.log(query);
        const { name } = qs.parse(query);  // name=hong 에서 hong 만 분리
        // console.log(name);
        const expires = new Date();  // 오늘 날짜 현재 시간 생성 저장
        expires.setMinutes(expires.getMinutes() + 1);  // 오늘날짜 현재시간 + 1분
        res.writeHead( 302, { 
            Location:'/',  
            'Set-Cookie' : `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()};HttpOnly;Path=/`,
        });  //  쿠키에 원하는 정보를 심는 동작
        login = true;
        //console.log(login);
        res.end();
    }else if( cookies.name ){  // 첫페이지이거나 로그인후에 다시 돌아거나
        // 쿠키에 로그인정보가 저장되어 있는지 확인한후  '홍길동님 방갑습니다' 를 표시
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`); 
    }else{
        res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
        try{
            const data = await fs.readFile('./06_Login.html');
            res.end(data);
        }catch(e){
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' } );
            res.end(e.message);
        }
    }

}).listen(3000, () => {  console.log('3000 포트에서 서버 대기 중');  });