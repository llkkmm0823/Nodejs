// 03_URL.js

const url = require('url');

const { URL } = url; // url 객체에서 URL 필드값만 구조분해를 통해 추출해냄. 
// 구조 분해 (Destructuring)는 배열이나 객체의 속성을 분해하여 개별 변수로 할당하는 것.
const myURL = new URL( 'http://www.daum.net/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():' , myURL);
console.log('url.format():', url.format(myURL));

console.log('---------------------------------------------');
const parsedUrl = url.parse('http://www.daum.net/book/bookList.aspx?sercate1=001001000#anchor');
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));
// 인터넷 주소를 parse 함수로 분해해서 각각의 요소들을 따로 분리하고 사용할 수 있음.
console.log(parsedUrl.query); // 파싱된 주소에게 쿼리만 분리하여 출력


