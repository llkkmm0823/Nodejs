// 04_Server04.js
const http = require('http');
const fs = require('fs').promises;

http.createServer(
    async (req, res)=>{
        // 파일의 내용을 읽어와서 그 결과를 클라이언트에 보내야하기 때문에
        // promise 기능의 함수를 동기식 코드들과 어우러지게 실행  await 활용
        // 파일을 읽어오는 fs.readFile 명령의 결과와 그 다음명령(res.write 또는 res.end)순서가 읽어온후 보내기로 지켜져야한다면, promise 기능의 함수를 await 로 실행하고,
        // then 에 전달된 data 대신에 결과를 별도의 변수에 리턴받아서
        // then 과  catch 대신에  try ~ catch 를 이용해서
        try{
            const data = await fs.readFile('./04_index.html');
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}  );
            res.end( data );
        }catch(err){
            console.error(err);
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
).listen(3000, ()=>{console.log('3000포트에서 서버 대기중...');} );

// http 상태 코드
// 2XX : 서버 전송 정상 완료. 
// 3XX: 리다이렉션(다른 페이지로 이동)을 알리는 상태 
// 4XX: 요청 오류를 나타냅니다. 요청 자체에 오류가 있을 때 표시됩니다
// 5XX: 서버 오류 - 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생합니다