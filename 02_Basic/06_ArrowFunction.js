// 06_ArrowFunction.js

// 함수의 표현 방법 #1
function add1(x,y){
    return x+y;
}
console.log('add1(){}', add1(10,20));

// 함수의 표현 방법 #2
let add2 = function(x,y){
    return x+y;
}
console.log( 'add2=function(){}',add2(10,20));
console.log();


// 함수의 표현 방법 #3-1
// function(x,y){  }
// (x,y)=>{ }

// const add = funciont(x, y){  }
// const add = (x,y)=>{ }
// 매개변수가 없을 때 : const add= ()=>{}
const add3 = (x, y)=>{
    return x+y;
}
console.log('add3(x,y)=>{}', add3(10, 20));


// 함수의 표현 방법 #3-2
const add4 = (x,y) => x+y;
// 리턴 명령이 한 개만 있는 함수라면, 위와 같이 중괄호없이 리턴될 값(단일값 또는 수식, 함수의 결과)만 화살표 뒤에 씀.
console.log('(x,y) => x,y', add4(20, 30));


// 함수의 표현 방법 #3-3
const add5 = (x,y) => x+y;
console.log('add5=(x,y) => (x+y)', add5(20, 30));


// 함수의 표현 방법 #3-4
// 매개변수가 하나라면 () 없이 표현 가능
function not1( x ) {
    return !x;
}
console.log( not1(true));
const not2 = x => !x;
// const not2 = (x) => (!x);
console.log( 'not2=x=>!x', not2(false));

let arr=[1,2,3,4,5];
/*arr.map(function(val, idx){
     console.log(val,idx);
});*/
arr.map((val,idx)=>{
    console.log(val,idx);
});

// 매개변수가 없고 리턴값이 없는 함수
const func1 = (x,y) => {
    console.log('매개변수( ${x} , ${y} ) 있고 리턴 값이 있는 함수 ');
 }
 func1(10,20);

// 매개변수가 있고 리턴값이 없는 함수
 const func2 = (x,y) => {
    console.log(`매개변수( ${x} , ${y} ) 있고 리턴값 없는 함수`);
}
func2(10,20);

// 매개변수가 있고 리턴값이 있는 함수
const func3 = (x,y) => {
    console.log(`매개변수( ${x} , ${y} ) 있고 리턴값 있는 함수`);
    return x+y;
}
console.log( '리턴값' + func3(10,20) );

// 매개변수가 없고 리턴값이 있는 함수
const func4 = () => {
    console.log(`매개변수 없고 리턴값 있는 함수`);
    return 100;
}
console.log( '리턴값' + func4(10,20) );

// 매개변수가 한 개인 함수
const func5 = (y) => {
    console.log('매개변수가 한 개인 함수 ');
 }

// 함수의 명령이 리턴 한 개인 함수
const func6 = (x) => x*x; 
console.log('리턴값' +  func6(25));
 








