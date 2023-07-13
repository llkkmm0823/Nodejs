// 02_TemplateString.js

// 문자열들의 '+'  연산
// 기존의 연산과 출력 방법
var num1 = 1;
var num2 = 2;
var result = 3;
var string1 = num1 + ' 더하기 ' + num2 + ' 는 \'' + result + '\'';
//var string1 = num1 + " 더하기 " + num2 + " 는 \'" + result + "\'";
console.log(' + 기호로 이어붙인 결과 : ' , string1); 

// Template String 을 사용하는 연산
// jsp  페이지에서  EL 문법을 사용한것과 비슷하게, 문자열과 변수값을 하나의 문장안에서 같이 표현하는 문법
// 전체문자열은 `(그레이브-틸드기호아래에 있는 따옴표하고 비슷한 기호)로 묶고 그 안에 어퍼스토피(작은따옴표)와 큰따옴표를 자유롭게 사용, 
// ${ 변수이름 } 를 이용하여 변수의 값을 문자열 안에 삽입

let string2 = `${num1}더하기 ${num2} 는 '${result}'`;
console.log('Template String구성 결과  : ' , string2);

const num3 = 1;
const num4 = 2;
const result2 = 3;
const string3 = `${num3} 더하기 ${num4} 는 '${result2}'`;
console.log(string3);

// 기존의  EL 문법처럼 중괄호안에서는 각 변수들간의 연산도 가능
const num5 = 2000;
const num6 = 3;
const text = `${num5} 원짜리 모자를 ${num6}개 구입하여, ${num5*num6}원을 지출하였습니다`;
console.log('연산결과 출력 : ' ,text);