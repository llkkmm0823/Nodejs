// 02_Path.js
const path = require('path');
// node.js와 자바 스크립트의 버전업데 따라 path모듈은 별도의 require 없이 사용이 가능하게되었습니다.

// path 가 아니어도 사용 가능한 경로와 파일관련 상수
console.log(__filename);  // 현재사용중인 파일의 이름
console.log(__dirname);  // 현재 파일이 위치한 경로

// 현재 경로와 파일의 이름을 변수에 저장하여 별도 출력
const string = __filename;
console.log( string );

console.log();
console.log('------------------------------');
console.log('path.sep : ', path.sep);   // 경로내부의 폴더들 구분문자
// '\' back slash ->  c:\users\java01 와 같이 사용합니다   
// sep : seperate 
console.log('path.delimiter : ', path.delimiter);
// 환경변수내에서 서로다른 경로를 같이 나타낼때 구분해주는 구분 문자 - 세미콜론 ';'
// c:\users\java01; c:\users\java01\documents;  와 같이 사용합니다

let filename = __filename; // "D:\JAVA01\Nodejs\03_HttpServer\04_FileRead\02_Path.js"
console.log();
console.log('--------------------------------------------------------');
// 파일이 위치한 폴더 경로 를 보여줍니다
console.log('path.dirname():', path.dirname(filename));
// 파일의 확장자(.js)를 보여줍니다
console.log('path.extname():', path.extname(filename));
// 파일의 이름+확장자 를 보여줍니다
console.log('path.basename():', path.basename(filename)   );
// 파일의 이름만 보고 싶다면, 함수의 두번째 인자로  확장자('.js')를 넣어줍니다
console.log('path.basename (extname 제외) : ', path.basename(filename,  path.extname(filename)));

// path.dirname(filename) + '\' + path.basename(filename) +  path.basename(filename,  path.extname(filename))


console.log();
//-----------------------------------------------------------
// 파일의 경로를  root, dir, base, ext, name 으로 분리합니다.
console.log('path.parse() : ', path.parse(filename));
// 분리된 결과를 root, dir, base, ext, name 라는 필드로 객체롤 구성합니다.

// 파일의 이름, 경로, 확장자 등을 제공하고   filename 에 저장된 정보처럼 조합합니다
let filename2 = path.format({
    dir:'D:\\JAVA01\\Nodejs\\03_HttpServer\\04_FileRead' ,
    name: 'path-formatex' ,
    ext: '.js',
});
console.log( filename2 );


// 파일 경로를 사용하던중  '\' or '/' 를 실수로 여러번 쓴걸 수정합니다
console.log( 'path.normalize():', path.normalize('D:///heejoonk\\\\node_js\\\javascript_ex1.js')  );
console.log();


// 파일의 경로가 절대경로인지 상대 경로인지  true  false  로 표시합니다.
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\'));
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));

// 파일의 입력인수로 넣어준 경로와 경로사이의  이동경로?를 표시합니다
console.log( path.relative('D:\\JAVA01\\nodejs',  'D:\\') );

// 처음 경로부터 이후 나오는 경로로 직접 이동한 폴더를 표시합니다
console.log( __dirname );
console.log('path.join():',  path.join(__dirname, '..',  '/heejoonk', '.',  '/node_js')    );


//----------------------------------------------------------------------
// resolve  와  join 은 비슷하지만 '/' 표시를 절대경로냐 상대경로로 보느냐가 다릅니다. 
// resolve 는 절대경로로 보기때문에 최종 결과 경로가  D:\node_js 가 됩니다
// '/heejoonk' 에 의해서 D:\heejoonk 로 되었다가 '/node_js' 에 의해서 다시 D:\node_js 로 설정됩니다
console.log('path.resolve():',  path.resolve(__dirname, '..',  '/heejoonk', '.', '/node_js'));


