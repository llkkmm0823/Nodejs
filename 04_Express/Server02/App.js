const express = require('express');
const path = require('path');
const app = express();
app.set( 'port', process.env.PORT || 3000 );

app.get('/', (req, res)=>{
    // http 서버에서 사용했던 파일을 읽어오고 읽어온 내용을 보내고 하는 방식을 사용하지 않습니다.
    // 파일을 선택해서 파일만 전송해줍니다.
    // 다만 상대경로가 아니라 절대 경로를 사용합니다.
    // 03_HttpServer / 04_FileRead 폴더의   path.js 를 참고해주세요
    // 파일을직접 보내는 메서드 res.sendFile();
    res.sendFile( path.join( __dirname , '/index.html' ) );
});
app.get('/users', (req, res)=>{
    res.end("<h1>USERS Page!!!</h1>");
});  

app.listen( app.get('port') , ()=>{ console.log( app.get('port'), "포트에서 서버 대기중..."); } );
