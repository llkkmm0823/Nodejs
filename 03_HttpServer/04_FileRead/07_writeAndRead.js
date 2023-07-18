// 07_writeAndRead.js

// writeMe2.txt에 '안녕하시므니까. \n반갑스므니다\n또 오시므니다\n내일뵙겠스믄다' 를 쓰고 바로 읽어서 콘솔창에 출력하시오.
const fs = require('fs');
const string = '안녕하시므니까. \n반갑스므니다\n또 오시므니다\n내일뵙겠스므니다.';
fs.writeFile('./writeMe2.txt', string , (에러) =>{
     if(에러) {
        console.error(에러);
     }
});
fs.readFile('./writeMe2.txt', (에러,data)=>{
    if(에러) {
        console.error(에러);
     }else{
        console.log(data.toString());
     }
});