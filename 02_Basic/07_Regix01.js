// 07_Regix01.js
// 정규 표현식

// 정규 표현식은 문자표현 공식, 문자 탐색 공식이라고 부르는 연산식과 같은 분류언어임.
// 전문가가 사용한 정규 표현식은 초보자에게는 어렵지만
// 문자 탐색과 스캔에 있어 강력한 기능을 갖고 있어, 여러분야에 많이 사용됨.
// 자바 스크립트에서도 많은 다양한 정규 표현식의 적용을 지원하고 있음.


var a = "While some may view this debt forgiveness as a slap in the face to people who were responsible and paid off their student loans";


// 문자 변수 또는 문자데이터.match(/찾고자하는 문자/);
// 대상 문들에게서 찾고자 하는 문자와 그 첫 번째 위치를 얻을 수 있습니다.
var result = a.match(/a/);
console.log(result);

result = a.match(/th/);
console.log(result);
console.log(result[0]); // 첫 번째 매칭 결과 문자
console.log(result[1]); // 매칭된 문자의 위치

// /th/g  :   'th'를 모두 찾아 그룹으로 얻을 수 있음.
result = a.match(/th/g);
console.log(result);


var a ="gabbvsadjnfkanfsjk";
var result =a.match(/ab*/g);   // a 변수안의 String 내용 중 a로 시작하고 b가 몇 개든 반복되는 글자를 검색 매칭하시오
// * : 0 이상 반복 출현하는 문자 매칭
console.log(result);



//================================================================================================================
console.log();
// 정규 표현식에 사용되는 탐색 기호들
// #1 [ ]
// [ ] : 배열에 썼던 대괄호로 표현함.
// [ ] : 괄호 안에 검색하고자 하는 글자들을 넣고, 그 포함 유무를 판단함.
// [abc] : a와 b와 c가 대상 문자열 안에 하나라도 포함되었는지 판단함.;
// [abc] 는 a 또는 b 또는 c를 의미함.
a = 'a';
result = a.match(/[abc]/g);    //  'a' , 'b', 'c' 글자 검색
console.log(result);
a = 'before';
result = a.match(/[abc]/g);
console.log(result);
a = 'dune';
result = a.match(/[abc]/g);
console.log(result);   // 매칭결과가 없으면 결과는 null 임.
a= 'before';
result = a.match(/abc/g);  // 'abc' 단어를 검색
console.log(result);  

// 위 둘의 매칭은 섞어서 사용이 가능함.
a = 'gabbzavsadjzcnfkanfsjk';
result =a.match(/z[abc]/g);
console.log(result);

/* 
[0-9] : 숫자와 매치, 0부터 9까지의 아라비아 기호 매칭 [0123456789]라고 써야하지만 줄여서 사용함

[a-z] : 문자 소문자와 매치, 소문자 a 부터 z 까지의 글자 매칭 =
[abcdefghijklmnopqrstuvwxyz]

[A-Z] : 문자 대문자와 매치, 소문자 a 부터 z 까지의 글자 매칭 =
[ABCDERFGHIJKLMNOPQRSTUVWXYZ]

[a -zA-Z] : 아라비아 기호를 제외한 대소문자

[a -zA-Z0-9] : 아라비아 기호, 소문자,대문자 모두 매칭
*/

// 소문자 검색
a = 'ABCDEfGHIJKLMNOpQ';
result =a.match(/[a-z]/g);
console.log(result);


// 숫자 검색
a = 'ABCDefgh0i3j5k';
result =a.match(/[0-9]/g);
console.log(result);


/*
#[0-9], [a-z], [A-Z] 등과 같은 방식으로 매칭이 가능한 표현

[\d] : 숫자와 매치. [0-9]와 동일한 표현.
[\D] : 숫자가 아닌것과 매치. [^0-9]와 동일한 표현.  
[\s] : whitespace(공백)과 매치. [\t\n\r\f\v] 와 같은 표현.
[\S] : whitespace(공백)이 아닌것과 매치. [^\t\n\r\f\v] 와 같은 표현.
[\w] : 문자와 숫자들과 매치. [0-9a-zA-Z]와 같은 표현.
[\W] : 문자와 숫자가 아닌것과 매치. [^0-9a-zA-Z]와 같은 표현.
'^'  : 대괄호[] 안에서는 뒤에 쓰인 글자를 제외하라는 뜻으로, 대괄호 밖에서는 다른 의미로 사용됨.
*/

// 숫자 검색
a = 'ABCDefgh0i3j5k';
result =a.match(/[\d]/g);
console.log(result);
// 공백 검색
a = 'ABCDe fg 0i 3j5k';
result =a.match(/[\s]/g);
console.log(result);
// 글자[문자와 숫자] 검색
a = '$&k$@*@g$^(^$';
result =a.match(/[\w]/g);
console.log(result);

/* 
Dot(.) : 줄 바꿈 글자인 '\n'을 제외한 모든 글자와 매칭됨.
a.b : a와 b사이에 어떤 글자가 들어와도 매칭됨.
a+ "모든 문자" + b
*/
a = 'fdgdfhdfaab';
result =a.match(/a.b/g);
console.log(result);

a = 'fdgdfdfaa4b';
result =a.match(/a.b/g);
console.log(result);

a = 'fdfa.bnfa';
result =a.match(/a.b/g);
console.log(result);

a = 'fdgdffa4b';
result =a.match(/a.b/g);
console.log(result);

// a.b와 a[.]b의 차이점
// [.]는 괄호 안에 '\n'을 제외한 모든 문자를 표시하는게 아니라 괄호안의 '.' 을 나타냄
// 'a.b'는 매칭 되지만, 'aab'는 매칭되지 않음.
a = 'fdsaa.bfeds';
result=a.match(/a[.]b/g);
console.log(result);

a = 'fdsaabfeds';
result=a.match(/a[.]b/g);
console.log(result);

console.log();
/*
- 반복 * 외 +
- '*' 는 앞에 있는 글자의 반복 횟수를 0회차부터 카운트하여 반복된 문자열 탐색
- '+' 는 앞에 있는 글자의 반복 횟수를 1회차부터 카운트하여 반복된 문자열 탐색
*/
a = 'caaaat';
result=a.match(/ca*t/g);
console.log(result);

a = 'caaaat';
result=a.match(/ca+t/g);
console.log(result);

a = 'ct';
result=a.match(/ca*t/g);
console.log(result);

a = 'ct';
result=a.match(/ca+t/g);
console.log(result);

/*
- 반복 {m.n}
  {m}: 앞에 위치한 글자의 m회 반복 매칭
  a{3} : a의 3회 반복
  - 정규 표현식 : 'ca{2,5}t'

  ? : 앞에 위치한 글자의 0회 또는 1회 반복 매칭
  a? : a의 0~1회 반복
  - 정규 표현식 : 'ca?t'
*/
console.log();
a = 'caat';
result = a.match(/ca{2}t/g);
console.log(result);
a='caaaaaat';
result = a.match(/ca{2}t/g);
console.log(result);

console.log();
a = 'caat';
b= a.match(/ca{2,4}t/g);
console.log(b);
a='caaaaaat';
b= a.match(/ca{2,4}t/g);
console.log(b);

a ='ct';
b = a.match(/ca?t/g);
console.log(b);

console.log();
// 연습문제1
// 아래 문자열 중 이름을 제외한 전화번호만 추출해서 출력하세요
a = "park chan ho 010-1234-5674 kim min kyu 010-4444-6666 lee dae ho 011-123-2222";
result = a.match(/\d{3}[-]\d{3,4}[-]\d{4}/g );
console.log(result);

// 연습문제1
// 아래 문자열 중 이름을 제외한 이메일 주소만 추출해서 출력하세요
a = "park chan ho park@naber.com kim min kyu kim@daum.net Lee dae ho lee@mthome.com";
result = a.match(/\w*[@]\w*[.]\w* /g );
console.log(result);



