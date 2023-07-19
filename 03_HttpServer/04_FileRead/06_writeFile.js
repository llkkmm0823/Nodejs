// 03_WriteFile.js

const fs = require('fs');

fs.writeFile(
    './writeMe.txt',    // 쓰려는 파일
    '텍스트가 입력됩니다',   // 쓰려는 내용
    (err)=>{
        console.error(err);
    }   // 에러발생시 실행할 함수
);