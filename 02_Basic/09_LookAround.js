// 09_LookAround.js

//파일 변경 해야함
//다음은 프로미스
// #### 정방 탐색
// 정규 표현식으로 구분해 내고 매칭한 결과 내용 중, 정규 표현식에 사용되었던 글자를 제외한
// 나머지를 결과로 얻고자 할 때, 예를 들어 http://www.naver.com 에서 '글자들이 반복되고 :
// 으로 끝남' 이라는 정규식이 있다면 결과는 http:가 될테지만 원하는 결과가 ':'을 제외한
// 'http'만을 목적할 때 사용하는 방식임.

let a = 'http://www.naver.com';
// '.' : \n 이 아닌 모든 글자
let result = a.match(/.+:/g);
console.log(result);

a = 'https://www.naver.com';
result = a.match(/.+:/g);
console.log(result);

console.log();
// 정방 탐색을 사용한 예
// 정규식 : (?=정규식 또는 글자)
// 조건에 매칭이 된 후, 해당(?= 뒤로 이어진) 정규식에 있는 글자는 소모하지 않는다.(취하지 않는다.)
a = 'http://www.naver.com';
b = a.match(/.+(?=:)/g);
console.log(b);

a = 'https://www.naver.com';
b = a.match(/.+(?=:)/g);
console.log(b);


// 전방위탐색
// 앞에서 정방탐색이라는 이름으로 매칭하고자 할 때, 버릴 문자와 취할 문자들을 앞, 또는 
// 뒤에서 검색하는것을 말함. 전방위 탐색은 검색하고 버릴 문자를 앞쪽에서 검색함,
// ?<= 정규식

// 후방위 탐색
// 검색 후  버릴 문자를 뒤에서 검색함.ㅣ
// ?=정규식 : 
console.log();

a ='<html><head><title>안녕하세요 반갑읍니다 </title></head><body><div>웹사이트에서 내용을 발취하므니다.</div></body></html>';

// <div></div>가 포함되어져서 추출
result = a.match(/<div>.+<\/div>/g);
// .+  : 글자 반복
// <\div> : </div>의 '/' 가 정규표현식의 종료로 잘못 인식되지 않게 '<\div>' 라고 씀.
console.log(result);

// <div></div>가 제외되고 추출
result = a.match(/(?<=<div>).+(?=<\/div>)/g);
console.log(result);

// 연습문제1
// 위의 a변수의 내용 중 타이틀 내용을 발취해서 출력하시오
result = a.match(/(?<=<title>).+(?=<\/title>)/g);
console.log(result);


// 연습문제2
a = '일반 텍스트 파일 : abc.tex , 자동실행파일: autoexec.bat, 데이터 분석 파일 : bigdata.ai, 더미파일 : gfreag, 알 수 없는 파일 : korea.bar';
// a 변수에서 파일이름. 확장자명으로 구성된 파일명만 골라서 출력하시오. (더미파일에 해당하는 파일 제외 나머지 추출)
// result = a.match(/  /g);
// console.log(result);

// 연습문제3
//  a변수에서 파일의 확장자가 b로 시작하는 파일을 찾아서 출력하시오
// result = a.match(/  /g);
// console.log(result);

// 연습문제 4
a = '박길동 : park@naver.com, 김하나 : kim@daum.net , 이두울 : ee@myhome.co.kr, 웹사이트 : http://abcdefg.co.kr';
// 이메일 주소만 추출해서 출력하되 .net과 .com만 골라서 출력
result = a.match(/\b\w*[@]\w*[.](com|net)\b/g);
console.log(result);

// 연습문제 5
a = '현재 접속중인 외부아이피는 110.8.6.181이며, 내부아이피는 192.168.0.44입니다';
// 위 내용에서 아이피 주소만 매칭하여 출력
result = a.match(/\b\d{1,3}[.]\d{1,3}[.]\d{1,3}[.]\d{1,3}\b/g);
console.log(result);



console.log();
//--------------------------------------------------------------------------------------------------
// REPLACE

//replace 함수를 이용하여 패턴으로 매칭된 텍스트를 지정한 텍스트로 치환 가능
a = 'blue socks and red socks';
result = a.replace(/blue|white|red/g,'color');
console.log(result);

a = 'park 010-1234-5678 , kim 010-8888-9999, lee 010-1111-2222';
//정규표현식과 replace를 이용하여 전화번호 뒷자리를 모드 마스킹(*로 치환)하세요
result = a.replace(/[-]\d{4}\s/g,'-****');
console.log(result);

a='네이버 - http://www.naver.com, 다음 - http:www.daum.net , 네이트 - http://www.nate.com';
// 위 문자열에서 http를 모두 https로 치환하여 출력하세요
result = a.replace(/\w+(?=:)/g,'https');
console.log(result);
