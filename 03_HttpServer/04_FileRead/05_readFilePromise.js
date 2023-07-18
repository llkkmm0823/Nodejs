// 05_readFilePromise.js

// 파일 입출력을 위한 모듈의 promise를 포함하여 로딩함.
const fs = require('fs').promises;

// readFile 함수에 Promise 객체를 리턴하는 기능이 담겨있음.
// 파일 읽기에 성공했을 때와 실패했을 때를 then과 catch에서 구분 실행해주면 됨.
fs.readFile('./readMe.txt')
    .then((data)=>{
        console.log(data.toString());
    })
    .catch((에러)=>{
        console.error(에러);
    });
console.log('Promise 로 파일 읽기를 종료함.')


/*
let result = fs.readFile('./readMe.txt')
console.log('Promise 로 파일 읽기를 종료함.')

// 딴 짓
// 딴 짓

result
.then((data)=>{
    console.log(data.toString());
})
.catch((err)=>{
    console.error(err);
});
*/