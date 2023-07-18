// 05_ArrayObject.js

// 1. 생성자  함수로 배열의 요소 추가 
function Student(name, korean, math, english, science){
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
        return `${this.name} | ${this.getSum()} | ${this.getAvg()}`;
    }
}      


let students = []; // 빈 배열 생성
let std1 = new Student('홍길남',87,97,64,34); //  Student 객체 생성
students.push( std1 );  // students 배열에 객체 추가

students.push(new Student('홍길남',15,63,61,24));
students.push(new Student('홍길북',45,37,48,82));
students.push(new Student('김길동',65,72,54,29));
students.push(new Student('박길동',78,95,45,8));
students.push(new Student('일지매',54,75,12,34));
for(var i in students){
    console.log( students[i].toString());
}
console.log();
// 또는 

students.map(function(k,i){
    console.log(k.toString());
});
console.log();

//------------------------------------------------------------------------------------
// 객체와 문자열과 그리고 변수, 함수의 활용
let sayNode = function(){
    console.log('Node');
}   // 변수에 함수를 저장해서 변수 이름이 함수 이름이 되게 함.

let myName = 'NodeJs';

// 객체 생성
let obj = { 
   // myName:'NodeJs',  -> 이미 저장이 되었있기 떄문에 중복이 발생함
   // myName:myName,  // 첫 번째 myName: 멤버변수, 두 번째 my name: 일반변수 
                      // this를 로 선언을 안하고 그냥 일반 변수의 myName을 불러옴
  myName,
  // 멤버변수와 대입될 값을 저장하고 있는 일반변수의 이름과 같다면, 위와 같이 한 번만 써서 표현할 수 있음.

  sayJS:function(){
    console.log('JS')
  },
  /*sayNode:function(){
    console.log('Node');
  },*/
  // sayNode:sayNode,
  sayNode,
}
console.log(obj.myName);   
obj.sayNode();
obj.sayJS();


//------------------------------------------------------------------------------------
console.log();   
// obj 객체에 ES6이라는 멤버수를 만들고  'Fantastic' 이라는 글자를 저장하려고 함.
// obj.ES6 , obj['ES6'] 
// #방법 1. obj.ES6 = 'Fantastic';
// #방법 2. obj['ES6'] = 'Fantastic';

// #방법 3. 문자들의 연산으로 변수 이름 생성
let es = 'ES';
obj[es+'6'] = 'Fantastic';

// 위 내용을 모두 종합한 객체 생성
const newObj = {
    myName,
    sayJS : function(){ console.log('JS'); },
    sayNode,
    [es+6] : 'Fantastic',
};
console.log( newObj.myName); // myName
newObj.sayNode(); // Node
newObj.sayJS(); // JS
console.log( newObj.ES6);  // Fantastic



console.log("------------------------------------------------------------------------------------");
// 객체의 구조 분해
// 객체 내부의 멤버변수 또는 멤버메서드를 별도의 변수에 따로 저장하여 별도로 사용하기 위한 문법
const sayJ = newObj.sayJS;
sayJ();
const sayN = newObj.sayNode;
sayN();
var es6 = newObj.ES6;
console.log(newObj.ES6);
console.log(es6);
const myN = newObj.myName;
console.log(myN);


console.log("------------------------------------------------------------------------------------");
// OneStep 구조분해
const newObject1 ={
    myName1 : 'NODE.JS',
    [es+2] : 'Fantastic',
    sayJS : function(){ console.log('JS'); },
    sayNo : function(){ console.log('NODE'); },
};
const {myName1, ES2, sayJS, sayNo} = newObject1;
// 구조분해되어 저장될 변수들이 있는 객체에서, 변수들의 이름은 객체내부에 있는 멤버변수들의 이름과 같은 이름을 써야 함.
console.log(myName1);
console.log(ES2);
sayNo();
sayJS();


console.log("------------------------------------------------------------------------------------");
const candyMachine = {
    status:{
        name: 'node',
        count: 5,
    },
    getCandy(){
        this.status.count --;
        return this.status.count;
    },
};
// 객체의 구조 분해를 하지 않아야 하는 경우 = this를 사용하는 객체는 구조분해를 하지 않는것을 권장함.
// var getCandy = candyMachine.getCandy;
// getCandy(); // 에러 - Cannot read properties of undefined (reading 'count')
// 객체 내의 메서드가 구조 분해되는 순간 안에 있던 this를 사용할 수 없게 되므로 
// 그 안에 count 또한 없는 변수가 되어, 에러를 발생시킴.

const { getCandy, status:{ count}} = candyMachine;
// 분해하지 않으려고 하는 멤버는 중괄호안에 쓰지 않아서 분해에서 제외할 수도 있음.


console.log();
// 이는 아래와 같이 배열의 여러 자료를 넣고 인덱스를 이용하여 따로 추출하는 것과
// 한 번에 추출하는 모양과 같은 형식으로 사용됨.

// 하나의 변수에 하나씩 추출
let array1 = ['nodejs',{},10,true];
let node1 = array1[0];
let obj3 = array1[1];
let bool1 = array1[3];
console.log(node1, obj3, bool1);
console.log();

// 한 번에 추출
const array2 = ['nodejs',{},20,false];
const [node2, obj2, bool2] = array2;
console.log(node2, obj2, bool2);
