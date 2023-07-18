//08_writeFrilePromis.js

const fs =require('fs').promises;

fs.writeFile( './writeMe3.txt', '안녕하세여\n반갑읍니다.')
.then(()=>{
    // 방금 쓴 내용을 다시 읽어오는 프로미스 함수를 리턴함.
    return fs.readFile('./writeMe3.txt');
    // then에서 프로미스 함수가 리턴되면, 또 하나의 then을 이어서 결과처리를 할 수 있음.
})
.then((data)=>{
    console.log(data.toString());
})
.catch((에러)=>{
   console.error(에러);
});
