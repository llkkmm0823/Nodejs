// 05_Server05.js
const http=require('http');
const fs = require('fs').promises;

http.createServer( 
    async(req,res)=>{
    // (req,res)=>{} : 서버가 시작되면서 실행될 내용을 담는 함수      
        try{   
                const data = await fs.readFile('./05_Front.html');
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end(data);
        }catch(에러){
                console.error(에러);
                res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
                res.end(에러.message);
        }
}
    // 05_Front.html 이 첫 화면으로 보이게 코딩하시오
).listen(3002, ()=>{console.log('3002포트에서 서버 대기중입니다.');} );;