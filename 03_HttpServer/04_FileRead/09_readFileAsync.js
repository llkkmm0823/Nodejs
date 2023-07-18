// 09_readFileAsync.js
const fs = require('fs').promises;
/*
console.log('시작');
fs.readFile('./readMe1.txt', (에러,data)=>{
    if(에러) {console.error(에러);}
        console.log('1번',data.toString());
});
fs.readFile('./readMe2.txt', (에러,data)=>{
    if(에러) {console.error(에러);}
        console.log('2번',data.toString());
});
fs.readFile('./readMe3.txt', (에러,data)=>{
    if(에러) {console.error(에러);}
        console.log('3번',data.toString());
});
console.log('끝');
*/

console.log('시작');
fs.readFile( './readMe1.txt',(에러,data)=>{
        if(에러){console.error(에러);
        }else{console.log('1번',data.toString()); }
        fs.readFile('./readMe2.txt',(에러,data)=>{
            if(에러){console.error(에러);
            }else{ console.log('2번',data.toString());}    
        fs.readFile('./readMe3.txt',(에러,data)=>{
            if(에러){console.error(에러);
            }else{ console.log('3번',data.toString());}
        }
      );   
});
    }
);