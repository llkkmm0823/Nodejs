// 02_Path.js
 const { dir } = require('console');
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

console.log();
//========================================================================================================
// 파일의 경로를 root,base,ext,name으로 분리함.
console.log('path.parse() : ' , path.parse(filename));
// 분리된 결과를  root,base,ext,name이라는 필드로 객체를 구성함.

// 파일의 이름, 경로, 확장자 등을 제공하고 filename에 저장된 정보처럼 조합함.
let filename2 = path.format({
    dir:'D:\\JAVA01\\Nodejs\\03_HttpServer\\04_FileRead'  ,
    name:'path-fornatex',
    ext: '.js',
});
console.log(filename2);

// 파일 경로를 사용하던 중 \ 나 / 를 실수로 여러 번 쓴 걸 수정함
console.log('path.normalize():', path.normalize('D://heejonnk/node_js/javascript_ex1.js'));
console.log();

// 파일의 경로가 절대 경로인지 상대 경로인지 true false로 표시함.
// 절대경로 & 상대경로 정의 정리: https://hellowwworld.tistory.com/60
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\'));
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));

// 파일의 입력인수로 넣어준 경로와 경로사이의 이동경로?를 표시함
console.log(path.relative('D\\JAVA01\\nodejs', 'D:\\'));

// 처음 경로부터 이 후 나오는 경로로 직접 이동한 폴더를 표시함.
console.log(__dirname);
console.log('path.join():', path.join(__dirname, '..', '/heejoonk', '.', '/node_js'));


//---------------------------------------------------------------------------------------------------
// resolve와 join은 비슷하지만 '/' 표시를 절대경로냐, 상대경로로 보느냐가 다름.
// resolve는 절대경로로 보기 때문에 최종결과가 D:\node_js가 됨.
// '/heejonnk' 에 의해서 D:\heejoonk로 되었다가 '/node_js' 에 의해서 다시 D:\node_js로 설정됨.
console.log('path.resolve():', path.resolve(__dirname, '..', '/heejoonk', '.', '/node_js'));