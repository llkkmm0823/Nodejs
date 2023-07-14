// 07_Regix01.js
// 정규 표현식

// 정규 표현식은 문자표현 공식, 문자 탐색 공식이라고 부르는 연산식과 같은 분류언어임.
// 전문가가 사용한 정규 표현식은 초보자에게는 어렵지만
// 문자 탐색과 스캔에 있어 강력한 기능을 갖고 있어, 여러분야에 많이 사용됨.
// 자바 스크립트에서도 많은 다양한 정규 표현식의 적용을 지원하고 있음.


var a = "While some may view this debt forgiveness as a slap in the face to people who were responsible and paid off their student loans";

var result = a.match(/a/);
console.log(result);

result = a.match(/th/);
console.log(result);