// 02_Path.js
 const path = require('path');
// node.js와 자바 스크립트의 버전 업데이트에 따라 path 모듈은 별도의 require 없이 사용이 가능하게 됨.

// path가 아니어도 사용 가능한 경로와 파일관련 상수
console.log(__filename); // 현재 사용 중인 파일의 이름
console.log(__dirname); // 현재 파일이 위치한 경로

// 현재 경로와 파일의 이름을 변수에 저장하여 별도 출력
const string = __filename;
console.log( string);

console.log();
console.log('=====================================================');
console.log('path.sep : ', path.sep); // 경로 내부의 폴더들 구분문자
// '\' back slash -> c:\user\java01 와 같이 사용함.
console.log('path.delemiter : ' , path.delimiter);
// 환경 변수내에서 서로 다른 경로를 같이 나타낼 떄 구분해주는 구분 문자 - 세미클론 ';'
// c:\users\java01; c:\users\java01\documents; 와 같이 사용함.


let filename = __filename;
console.log();
console.log('=====================================================');
// 파일이 위치한 폴더 경로를 보여줌
console.log('path.dirname():', path.dirname(string));
// 파일의 확장자(.js()를 보여줌
console.log('path.extname():', path.extname(string));
// 파일의 이름+확장자를 보여줌
console.log('path.basename():', path.basename(string));
// 파일의 이름만 보고 싶다면, 함수의 두 번째 인자로 확장자('.js')를 넣어줌
console.log('path.basename(extname 제외):', path.basename(string, path.extname(string)));