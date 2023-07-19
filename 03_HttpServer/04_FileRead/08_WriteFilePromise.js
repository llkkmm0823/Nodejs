// 08_WriteFilePromise.js

const fs = require('fs').promises;
/*
fs.writeFile(  './writeMe3.txt',   '안녕하세요\n반갑습니다' )
.then(()=>{})
.catch((err)=>{console.error(err)});
*/
fs.writeFile(  './writeMe3.txt',   '안녕하세요\n반갑습니다' )
.then(()=>{
    // 방금쓴 내용을 다시 읽어오는 프라미스 함수를 리턴합니다
    return fs.readFile('./writeMe3.txt');
    // then에서 프라미스 함수가 리턴되면, 또하나의 then을 이어서 결과처리를 할수 있습니다
})
.then((data)=>{
    console.log(data.toString());
})
.catch((err)=>{
    console.error(err);
});