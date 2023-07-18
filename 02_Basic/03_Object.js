// 03_Object.js

// 1. 자바 스크립트에서의 객체 생성
// { } 중괄호안에 key(요소의 이름)와 value(요소의 값)이 ':' (콜론) 으로 구분되어서 존재하는 값들의 집합.
var product = { name: '냉장고', 제조사: '대한민국' };
// 변수 하나 안에 한 개 이상의 키값과 벨류값이 조합된 데이터를 넣어 사용함.
// 객체 안에 있는 키값과 벨류값의 조합 하나를 속성이라고 하며, 각 속성은 콤마(,)로 구분함.

// 객체 내의 키값을 이용한 값의 출력
console.log(product['제조사']);
console.log(product.name);

// 자바스크립트의 객체는 별도의 클래스 선언 없이, { } 중괄호 안에 직접 속성들을  넣는 순간,
// 객체(Object)로 인식되어 사용되어짐.
// 값들의 자료형은 제한이 없으며, 객체 안에 객체, 객체 안의 배열 등 모든 형태의 자료가 속성드로 구성이 가능함.
var obj1 = {
    useNumber: 273,
    userString: '문자열',
    userBoolean: true,
    useObject: { a: '1', b: '2' },
    useArray: [1, 2, 3, 4, 5],  // 오라클과 다르게 마지막 속성에 컴마를 써도 되고 안 써도 됨.
}
var obj2 = {}; // 객체형 변수를 만들되 아직 넣어 둘 속성이 없다면 빈 객체 생성이 가능함.
// 자바 스크립트 객체는 변수를 먼저 만들고 추후에 속성을 추가해 넣을 수 있기 때문에 가능함.
console.log(typeof (123));
console.log(typeof (123.123));
console.log(typeof ('abc'));
console.log(typeof (true));
console.log(typeof (obj1));
console.log(typeof (obj2));
console.log(typeof ({}));


// 2. 객체의 속성과 메서드
// - 속성 : 객체 내부에 있는 하나하나의 값.
// - 메서드 : 객체 내부에 있는 멤버 변수(속성)를 컨트롤하거나 객체 관련 명령을 실행 하기 위한 함수.
var object = {
    useNumber: 273,
    useString: '문자열',
    useBoolean: true,
    useArray: [52, 385, 103, 56],
    // 메서드: 객체의 속성 중 함수 자료형인 속성.
    method: function () {
        console.log('멤버 함수를 실행함');
    }
};
object.method(); // 함수의 이름에 괄호를 붙여서 함수의 내용을 실행함.
// var abc = function(){console.log('함수 실행'); };

// abc();    // 함수 이름 옆에 괄호가 있으면 실행.
// console.log( abc ); // 출력 할 시 -> [Function: abc] // 함수 이름만 있으면 문자열을 저장한 변수

console.log(object.method);
// 저장된 자료형(Function)과 함수 이름 (abc) 출력
console.log(object.method());
// 함수의 내부에 잇는 "console.log('멤버 함수를 실행함'); "  실행 -> '멤버 함수를 실행함' 출력됨.
// console.log(object.method()); 에서 console.log() 는 아무것도 리턴되지 않은 함수 
// object.method()의 결과값 undefined 출력

// 멤버함수에 매개변수가 존재 할 수 있음.
var person = {
    name: '홍길동',
    eat: function (food) {
        console.log('음식: ' + food);
    }
};
console.log(person.name);
person.eat('스파게티');

console.log();
// 멤버 함수가 멤버변수로의 접근
// - this 키워드 : 자바스크립트는 멤버변수에 접근을 위해서 반드시 this 키워드를 써야 함.
var person = {
    name: '홍길동',
    eat: function (food) {
        // console.log( this.name + '이/가' + food  + '을/를 먹었읍니다.');
        console.log(`'${this.name} '이/가  '${food}' 을/를 먹었읍니다.`);
    }
};
person.eat('김밥');

console.log();
// 3. 객체의 반복문
var product = {
    name: 'Node.js & Express',
    price: 'Free',
    language: '한국어',
    supportOS: 'win32/64',
    subscrpition: true
};

// key : 대상 객체의 속성 이름들을 담을 String 변수
// product : 대상 객체
for (var key in product) {
    console.log(key, ":", product[key]);
    console.log(`${key}  : ${product[key]}`);
};
/*
for...in 루프는 JavaScript에서 객체의 속성을 열거하기 위해 사용되는 반복문입니다.
이 반복문은 객체의 속성을 순회하면서 각 속성에 대해 반복 작업을 수행합니다.

for...in 루프의 구문은 다음과 같습니다:

for (var variable in object) {
    // 반복 작업 수행
}

여기서 variable은 각 속성의 이름이 할당될 변수입니다. 
object는 반복할 객체입니다. 
반복문은 객체의 속성을 하나씩 순회하며, 각 속성의 이름이 variable에 할당됩니다.

for...in 루프는 객체의 모든 열거 가능한 속성을 반복합니다. 
이때 상속된 속성은 제외하고, 객체에 직접 정의된 속성만 반복합니다. 
또한, 속성의 순서는 보장되지 않습니다.

for...in 루프를 사용하여 객체의 속성에 접근할 수 있습니다.
*/

console.log();
// 4.객체와 관련된 키워드
var student = {
    이름: '홍길동', 국어: 92, 수학: 98, 영어: 96, 과학: 98
};
// -in 키워드 : 해당 키가 객체 안에 있는지 확인
//             터미널 창에 true or false로 표시해줌.
var output = '';
output += "'이름' in student: " + ('이름' in student) + '\n';
output += "'성별' in student: " + ('성별' in student) + '\n';
console.log(output);

console.log();
// - with 키워드 : 복잡하게 사용해야 하는 코드를 짧게 줄여 주는 키워드.
var student = {
    이름: '홍길동', 국어: 92, 수학: 98, 영어: 96, 과학: 98
};
// .with 키워드를 사용하지 않는 경우
var write = '';
write += `이름 : ${student.이름}  \n`;
write += `국어 : ${student.국어}  \n`;
write += `수학 : ${student.수학}  \n`;
write += `영어 : ${student.영어}  \n`;
write += `과학 : ${student.과학}  \n`;
console.log(write);
//      - with 키워드를 사용한 경우
var write = '';
with (student) {
    write += `이름 : ${이름}  \n`;
    write += `국어 : ${국어}  \n`;
    write += `수학 : ${수학}  \n`;
    write += `영어 : ${영어}  \n`;
    write += `과학 : ${과학}  \n`;
    console.log(write);
}
console.log(write);

console.log();
// 5. 객체의 속성 추가와 제거
// - 동적 속성 추가/제거 : 처음 객체를 생성하는 시점 이 후 에 객체의 속성을 추가하거나, 제거 할 수 있다.

// 빈 객체를 생성.
var student = {};

// 자바스크립트 객체의 장점 : 객체 생성 이 후 동적으로 속성 (멤버변수)를 추가 할 수 있다.
student.이름 = '홍길동';
student.취미 = '악기';
student.특기 = '프로그래밍';
student.장래희망 = '백앤드 개발자';

for (var key in student) {
    //console.log(`${key} : ${student[key]}`);
    process.stdout.write(`${key} : ${student[key]}`);
}
console.log();
console.log('\n');

// 같은 방식으로 멤버 메서드(함수)도 추가가 가능함.
student.method = function () { console.log('동적으로 추가된 함수 실행'); }
student.method();

console.log('\n');
// 선언된 객체 내부의 변수값 또는 함수를 변경할 수 있음.
student.이름 = '홍길남';
student.method = function () { console.log('수정된 함수 실행'); }
console.log(`이름 :${student.이름}`);
student.method();

console.log();
// 객체의 속성 제거
delete (student.장래희망);
delete (student.method);
student.toString = function () {
    for (var key in this) {
        if (key != 'toString') {
            console.log(`${key} : ${student[key]}`);
        }
    }
}
student.toString();

// 객체의 내용을 바꾸는 또 다른 방법
student = {
    name: '홍길서',
    hobby: '스모',
    sa: '웹 퍼블리싱',
    toString: function () {
        for (var key in this) {
            if (key != 'toString') {
                console.log(`${key} : ${student[key]}`);
            }
        }
    },
};
student.toString();





console.log();
// 6. 생성자 함수 : new 키워드를 사용해 객체를 생성 할 수 있는 함수.
// -생성자 함수를 사용한 객체의 생성과 출력. 그냥 함수를 사용해 객체를 리턴하는 방법과 차이가 없어 보임.

// 함수 하나를 생성하되, 함수 안에 this를 이용한 변수에 값을 넣으면 그 이름의 멤버 변수가 만들어지고,
// 최종적으로 그 변수들을 멤버로 하는 객체가 만들어지는 생성자 함수로 인식더됨.
function Student(name, korean, math, english, science) {
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.english = english;
    this.science = science;
    this.getSum = function() {
        return this.kor + this.math + this.english + this.science;
    }
    this.getAvg = function() {
        return this.getSum() / 4;
    }
    this.toString = function() {
        return `이름:${this.name} | 총점:${this.getSum()} | 평균:${this.getAvg()}`;
    }
}      // 객체가 만들어지기 위한 생성자 함수
console.log();

Student.music = 100; // Student 생성자 함수에 속성 추가 X   

var std1 = new Student('홍길동' , 88,78,98,87);
var std2 = new Student('홍길남' , 77,45,65,87);
var std3 = new Student('홍길서' , 76,98,35,45);
console.log( std1.toString());
console.log( std2.toString());
console.log( std3.toString());

console.log();
//std1.music = 100;  // std1 객체에 music 속성 추가 성공

console.log('music : ' , std1.music);
console.log('music : ' , std2.music);
console.log('music : ' , std3.music);


// 7. 프로토타입
// - 생성자 함수를 사용해 생성된 객체가 공통으로 가지는 공간.
// - 자바스크립트의 모든 생성자 함수는 내부의 this 변수들의 prototype을 갖음.
//   그리고 prototype은 객체임.
function Student(name, korean, math, english, science){
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.english = english;
    this.science = science;
}
// 프로토타입이란, 생성자에서 만들어진 원본 객체이며, 생성자 호출로 객체를 만들때 
// 그 원본을 복사해서 객체를 생성함.
// 생성자 함수가 만들어지고, 그 안에 this를 이용한 멤버변수가 정의되면,
// 그 함수가 만들어질 객체를 위한 "프로토타입"이라고 하는 복사용 원본객체가 생성됨.
// 프로로토타입은 생성될 객체로 복사될 원본객체이며, 객체형태로 존재함.

// 즉 새로운 객체를 만들기 위해 생성되는 원본 객체임.

var std1 = new Student('홍길서',87,98,87,45);
// 위 명령이 실행되는 순간 프로토타입의 사본이 std1에 저장되면서 새로운 객체를 이룸.

std1.music = 100; // std1 객체에만 별도로 멤버변수가 추가되는 경우

// 만약 생성자 함수에 추가로 멤버변수 또는 멤버메서드를 추가하려고 한다면,
Student.prototype.music = 100;
var std2 = new Student('홍길서',87,98,87,45);
console.log("music : ", std2.music);
// 새로 추가된 멤버변수 music 변수의 값을 전달인수로 전달해서 초기화 할 수는 없음.
// 이 후에 새로 만들어지는 모든 객체의 music 변수값은 모두 100임.

// 멤버 함수를 생성자에 추가하려면
Student.prototype.getSum = function(){
    return this.kor + this.math + this.english + this.science + this.music;
};
Student.prototype.getAvg = function(){
    return this.getSum() / 5;
};

Student.prototype.toString = function(){
    return `${this.name} | ${this.getSum()} | ${this.getAvg()}`;
};

var std4 = new Student('홍길북', 87,98,87,45);
console.log();
console.log(std4.toString());


// 객체를 생성 후 맴버메서드에 멤버변수를 추가하느냐,
// 생성자를 만들어서 프로토타입에 메서드와 변수를 추가 후 객체를 만드느냐는 선택적으로 사용할 수 있다.




// 9. Object 객체
// - toString() 메서드
// - 객체를 문자열로 변환할 때 자동으로 호출.
var obj = new Object();
console.log(obj); // {}
console.log(obj.toString()); // [object Object]

// new Object()로 만들어진 객체에 내가 필요한 변수와 메서드를 추가하면, Obeject가 갖고 있던 
// 요소들과 함께 사용이 가능함.
// = toString()메서드 재정의(메서드 오버라이드.override)
obj.name = "김하나";            // 멤버변수 추가
obj.grade = "고등학교 1학년";    // 멤버변수 추가
console.log( "toString 오버라이드 전 " , obj.toString());    // toString 재정의 전 호출
obj.toString = function(){  return this.name+':'+this.grade; };
console.log( "toString 오버라이드 후 " ,obj.toString());    // toString 재정의 후 호출

// console.log 에 객체 변수 이름을 넣으면 모든 필드(함수 포함)가 객체 형태로 구성되어 출력됨.
console.log(obj);
