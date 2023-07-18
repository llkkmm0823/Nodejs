//08_Regix02.js

// 메타캐릭터(메타문자) : ^, $, | 등의 글자로 패턴을 글자들



//  | : or 의 의미로 사용. a | b 은 a 또는 b의 의미
let a = "Hello World";
let result = a.match(/Hello|Crow/g);
console.log(result);

a = "Welcome Crow";
result = a.match(/Hello|Crow/g);
console.log(result);

a = "Hello World Welcome Crow";
result = a.match(/Hello|Crow/g);
console.log(result);


//  ^ : ^abc 는 abc로 시작하는 의미의 정규식( [] 안에서 사용할 때는 다른 의미)
a = "Life is too short";
result = a.match(/^Life/g);
console.log(result);



// $ : abc$는 abc로 끝나는 의미의 정규식
a = "Life is too short";
result = a.match(/short$/g);
console.log(result);

// * b: Word Boundary의 뜻으로, whitespace로 식별되는 메타 문자임.
// * 원래 문자열 안에 사용하는 \b 는 백스페이스의 역할을 하는 이스케이프 문자이지만,
// * 정규 표현식에서는 공백을 의미하도록 사용됨.

console.log();

a = "no class are all classa";
b =  a.match(/\bclass\b/g);
console.log(b);

a = "the declassified algorithm";
b =  a.match(/\bclass\b/g);
console.log(b);

a = "onew subclass is";
b =  a.match(/\bclass\b/g);
console.log(b);

console.log();
// * B: whitespace로 구분되지 않은 , 그 외 다른 글자로 구분되는 정규식
a = "no class are all classa";
b =  a.match(/\Bclass\B/g);
console.log(b);

a = "the declassified algorithm";
b =  a.match(/\Bclass\B/g);
console.log(b);

a = "one subclass is";
b =  a.match(/\Bclass\B/g);
console.log(b);


