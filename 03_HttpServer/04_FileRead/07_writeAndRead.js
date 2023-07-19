// 03_WriteAndRead.js

// wirteem2.txt  에  '안녕하세요. \n방갑습니다\n또오세요\n내일뵙겠습니다' 를 쓰고  바로 읽어서 콘솔창에 출력하세요
const fs = require('fs');
const string = '안녕하세요. \n방갑습니다\n또오세요\n내일뵙겠습니다.';
fs.writeFile('./writeme2.txt', string , (err) => {
    if (err) {
        console.error(err);
    }
});
fs.readFile('./writeme2.txt', (err, data)=>{ 
    if(err){
        console.error(err);
    }else{
        console.log(data.toString());
    }
 } );
