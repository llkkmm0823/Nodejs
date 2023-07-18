// 04_readFile.js

// 파일의 내용을 읽거나 쓰기 위한 모듈
const fs = require('fs');

fs.readFile(
    './readMe.txt',    // 읽어 올 파일의 경로와 이름
    (err, data)=>{
        if( err ){      // err이 null이 아니라면, 즉 에러가 있다면
            console.error(err);
        }else{
            console.log(data);
            console.log(data.toString());
        } 
    },   // 읽어 온 파일을 처리 할 함수
);
// err : 파일 읽기에 실패했을 때 전달 되는 에러내용을 받는 매개 변수
// data : 파일 읽기에 성공했을 때 읽어 온 파일 내용 데이터

