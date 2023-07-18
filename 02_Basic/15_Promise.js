//   15_Promise.js
let condition = true;
const promise1 = new Promise( (resolve, reject) => {
    if (condition) resolve('성공');
    else reject('실패');
});

// await 를 사용한 명령은 반드시 async 로 만들어진 함수 안에서 사용해야 합니다
async function abcd(){
    try{
        // promise1의 값을 현재 함수의 지역변수에 저장. 이때 await라는 키워드를 사용함.
        // await : promise 의 비동기실행을 기다리다가 필요할때 꺼내기 위한 키워드 
        result = await promise1;   //  resolve 에서 전달한 값을  result  에 저장       
        console.log('1' + result);  
    } catch(error){
        console.error('2' + error);
    }
    console.log('3.abcd 함수 종료');
}
abcd();
