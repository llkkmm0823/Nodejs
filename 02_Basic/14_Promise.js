//  14_Promise.js

// 동기 실행과 비동기 실행의 차이점
// 우리에게 긴 작업의 작업1과 짧은 작업의 작업2가 있다면


// # 동기 실행
/*
console.log('작업 시작');
console.log('작업1 시작 : 오래걸리는 작업' );
// 현재 시간에 3초를 더한 값을 wakeUpTime 변수에 저장
// 오래걸리는 작업이 오래 걸리는 거처럼 보이게 하기 위해 일부러 시간을 이용한 반복실행을 사용
// 계속해서 현재시간을 wakeUpTime 와 비교해서 그보다 커질때가지 반복살행
const wakeUpTime = Date.now() + 3000;
while (Date.now() < wakeUpTime) {}
console.log('작업1 종료');
console.log('작업2 시작 : 오래 걸리는 작업의 다음작업');
console.log('작업2 종료');
console.log('==작업 종료==');

console.log();
// # 비동기 실행
function longRunningTask() {
    console.log('작업1의 내용 모두 종료 후 끝')
}
console.log('시작');
console.log('작업1 : 오래 걸리는 작업 시작');
console.log('작업1을 비동기 실행으로 전환');
setTimeout(longRunningTask, 3000);  // setTimeout 이 3초후에 longRunningTask함수를 호출합니다
// setTimeout 은 비동기 함수이기때문에 별도의 실행스레드가 실행을 담당하고, 현재 스레드는 다음 명령으로 실행포커스가 이동합니다.
console.log('작업2 : 오래 걸리는 작업의 다음 작업 시작');
console.log('작업2 만 일단 끝');
*/

/*
// # Promise  로 실행
console.log('시작');
let longRunningTask = new Promise( 
    (resolve, reject)=>{ 
        console.log('작업1 : 오래 걸리는 작업 시작');
        setTimeout( ()=>{ console.log('작업1 : 종료'); } , 3000 );
        resolve();
    } 
);
longRunningTask
    .then( 
        ()=>{  
            console.log("작업2 : 오래걸리는 작업의 다음작업");
            console.log("작업2 : 종료");
        } 
    );
console.log('==모든 작업 종료==');
*/

const pm1 = new Promise( (resolve, reject) => {
   resolve("첫 번째 리졸브");
});
pm1.then( ( message1 )=>{ 
        console.log( message1 ); 
        return new Promise((resolve, reject) => {
            resolve("두 번째 리졸브")
        });
    } ).then( ( message2 )=>{ 
        console.log( message2 ); 
        return new Promise((resolve, reject) => {
            resolve("세 번째 리졸브")
        });
    } ).then( ( message3 )=>{ 
        console.log( message3 ); 
    } )
    .catch( ( error )=>{ 
        console.error( error ); 
    } );