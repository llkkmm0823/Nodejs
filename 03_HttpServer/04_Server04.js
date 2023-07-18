// 04_Server04.js
const http = require('http');
const fs = require('fs').promises;

http.createServer(
         async(req, res)=>{     
            // promis 기능의 함수를 동기식 코드를과 어우러지게 실행함 : await를 사용.
            // 파일의 내용을 읽어와서 그 결과를 클라이언트에 보내야하기 때문임.
            // 파일을 읽어노느 fs.readFile 명령의 결과와 그 다음 명령(res.write 또는 res.end)
            // 순서가 일고 보내기 순으로 지켜져야 한다면, promise 기능의 함수를 await로 실행하고,
            // then에 전달된 data 대신에 결과를 리턴받아서,
            // then과 catch 대신에 try~catch를 이용해서
            try{   
                    const data = await fs.readFile('./04_index.html');
                    res.writeHead(200,{'Content-Type':'text/HTMLAllCollection; charset=utf-8'});
                    res.end(data);
            }catch(에러){
                    console.error(에러);
                    res.writeHead(200,{'Content-Type':'text/HTMLAllCollection; charset=utf-8'});
                    res.end(data);
            }
    }
).listen(3000, ()=>{console.log('3000포트에서 서버 대기중이므니다.');} );