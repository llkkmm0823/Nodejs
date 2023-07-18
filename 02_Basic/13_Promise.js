// 13_Promise.js

// Promise를 직접 구성하여 참조변수에 저장
// const pm  = new Promise( /* 익명함수*/);
let condition = true;
function create(){
    return new Promise(
        (resolve, reject)=>{
            if(condition){
                resolve();
                console.log("1:resolve");
            }else{
                reject();
                console.log("2: reject");
            }
        }
    );
};
//const pm = create();
//pm.then().catch().finally();
create()
.then(
      ()=>{
           console.log("3.성공");
      }
).catch(
    ()=>{
        console.log("4.실패");
   }
).finally(
    ()=>{
        console.log("5.종류예정");
   }
);
console.log("6.종류");


// 함수의 리턴값을 promise로 받아서 결과에 따른 구분된 처리를 할 수 있음.
// Promise의 기능  비동기 실행으로 별도의 명령을 실행할 수 있음.
