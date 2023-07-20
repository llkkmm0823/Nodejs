// 05_Server.js
const http=require('http');
const fs = require('fs').promises;

let users = {};

// (req,res)=>{} : 서버가 시작되면서 실행될 내용을 담는 함수
http.createServer( 
    // 함수안에 await 형태의 함수가 호출되려면, 그를 포함한 함수는 async 키워드를 써서 작성합니다.
    async (req, res)=>{
        // fs.readFile 함수가  await로 실행되면 then, catch 를 쓰지 않으므로, 파일 입출력 당시 오류를 try~catch로 처리합니다
        try{  
            // console.log(req.url);
            // 요청된 method 먼저 구분하고, 그 다음 url 로 해당 요청에 대해 처리합니다
            if( req.method == 'GET' ){  // 조회기능에 많이 사용
                if( req.url === '/'){
                    const data = await fs.readFile('./05_Front.html');
                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                    return res.end(data);
                }else if( req.url === '/about'){
                    const data = await fs.readFile('./05_about.html');
                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                    return res.end(data);
                }else if( req.url === '/users'){
                    // users 객체에 있는 값들을 클라이언트로 안전하게 전송
                    res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
                    // users 객체 안의 내용을 json 형식으로 변경하여 전송
                    return res.end( JSON.stringify(users) );
                }

            }else if( req.method == 'POST' ){   // 중요정보 입력(insert)

                if( req.url === '/user'){
                    req.on('data', (data)=>{ // {'name' : '홍길동'}
                        let body = '';
                        //console.log('전송 data :', data);
                        body += data;  // 비어있는 글자를 이어붙이기해서 toString()없이 문자로 변환
                        //console.log('문자로 변환한 data : ', body);
                        const {name} = JSON.parse(body);
                        const id = Date.now(); // id 변수에 날짜를 추출(날짜 현재시간을 밀리초로
                        users[id] = name;  // 키값은 id, 밸류값은 name 으로 객체에 저장
                        //console.log(users);
                    });
                    return res.end('ok'); 
                }
            }else if( req.method == 'PUT' ){   //  특정 자료를 수정(update)할 때
                if( req.url.startsWith('/user/') ){
                    let body='';
                    // PUT 으로 전송된  url   '/user/41560148569'
                    let urlarr = req.url.split('/'); // ''    'user'    '41560148569'
                    const key = urlarr[2];
                    req.on('data', (data) => {
                        body += data;
                        const user = JSON.parse(body);
                        users[key] = user.name;  
                        // users 객체의 key 값의 항목을 전송되 name으로 수정
                    });
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('ok');
                }
            }else if(req.method == 'DELETE' ){   // delete 
                if( req.url.startsWith('/user/') ){
                    //     /user/41560148569
                    let urlarr = req.url.split('/'); // ''    'user'    '41560148569'
                    const key = urlarr[2];
                    delete users[key];
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('ok');
                }
            }
            // 위의 각 if의 경우의 수에 req.url 이 없을때 아래가 실행됩니다
            res.writeHead(404);
            return res.end('<h1>NOT FOUND</h1>');
        }catch(e){
            console.error(e);
            res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(e.message);
        }
    } 
).listen( 3000, ()=>{  console.log('3000포트에서 서버가 대기중....');   }  );;