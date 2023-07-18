// 06_writeFile.js

const fs =require('fs');

fs.writeFile(
    './writeMe.txt',                   // 쓰려는 파일 
    '텍스트가 입력되므니다.',            // 쓰려는 내용
    (에러)=> {
        console.error(에러)
    }                                  // 에러 발생 시 실행할 익명함수
);
