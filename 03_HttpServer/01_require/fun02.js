// fun02.js
// 구조분해 할당으로 변수 초기화
const { odd, even } = require('./Var');
// { odd, even } = { odd:odd, even:even, };

// require 로 얻어온 값을 이용한 함수 제작
// 전달인수의 값이 짝수인지 홀수인지를 판단하는 함수
function checkOddOrEven(number){
    if( number % 2 ){
        return odd;
    }else{
        return even;
    }
}
// console.log( checkOddOrEven(123) );
module.exports = checkOddOrEven;
// 모듈을 이용하면, 함수도 exports 해서 다른 파일에서 사용이 가능합니다.
/*
module.exports = (number) => {
    if(number % 2){
        return odd;
    }else{
        return even;
    }
}
*/