const express = require('express');
const path = require('path');
const app = express();

app.set( 'port',process.env.PORT || 3000);
// app.get() 또는 app.post() 등... 리퀘스트로 키워드를 받아 해당 요청에 응답을 보내주는 메서드들을 "라우터(Router)"라고 부릅니다. 
// 라우터의 첫번째 전달요소로 리퀘스트 키워드를 요청받아 익명함수를 실행해서 응답합니다.  
// 그 익명함수 ()=>{} 을 "미들웨어" 라고 부릅니다

// 미들웨어만을 위한 멤버함수(라우터)가 존재합니다
//1. 모든 라우터들이 실행되기 전 실행되는 라우터 : 보통 다른 라우터들의 위쪽에 기술되어져서, 모든 라우터들이 실행되기전 실행의 대상으로 인식됩니다.
app.use((req, res, next)=>{
    console.log('모든 요청에 실행하고 싶어요');
    next();
    // 모든라우터에 next 가 있지만 사용하지 않아서 생략된 상태입니다. 필요하면 꺼내서 사용할수 있습니다.
    // next() 가 없으면 현재 라우터에서 요청에대한 응답이 종료되니,  미들웨어를 위한 라우터는 반드시  next() 를 사용해주세요
});
// --------------------------------------------------------------





//2. 특정 리퀘스트 에서만 실행할 미들웨어
app.use('/about', (req, res, next)=>{
    console.log('about 요청에만 실행하고 싶어요');
    next();
});
// get 과 post 등 모든 method 에서 리퀘스트 키워드만 같으면 실행됩니다
// 실행후 next() 로 인해 제어권이 아래로 이동하여, 해당 get 이나 post 등이 추가 실행됩니다.
//----------------------------------------------------------
app.get('/about' , (req, res)=>{
    res.send('<h2>Hello, About</h2>');
});



// 4.1 에러발생--------------------------------------
app.use((req, res, next)=>{
    //throw new Error("서버-에러를 발생시켜주마~!!!");

    // 파일 하단에  4.2 에러처리라우터가 없으면 브라우져에 에러내역이 표시되어 모든 서버 구조가 노출됩니다. (500 에러)
    // 에러내역은 서버의 콘솔에만 나오고 브라우져에는 에러처리에 의한 내용만 나오도록 "에러 처리 라우터"를 마지막에 추가해줍니다

    //5. 에러 처리의 또다른 형태
    /*try{
        console.log(정의안된변수사용);
    }catch(error){
        next(error); // 에러처리 미들웨어로 이동하라는  next
        // next에 error 가 인수로 들어가면 에러처리 라우터로 이동합니다
        // erroe 말고 'router' 가 인수이면 다음 미들웨어로 이동하라는 뜻입니다.
    }*/

// '/' 와 '/router' 라는 url로 각각 index1.html, index2.html을 응답 파일로 전송해주세여.
app.get('/',(req,res)=>{
    res.sendFile( path.join(__dirname, '/index1.html'));
 });
 app.get('/router',(req,res)=>{
    res.sendFile( path.join(__dirname, '/index2.html'));
 });
 


app.listen( app.get('port'), ()=>{ 
    console.log( app.get('port'), "포트에서 서버 대기중"); 
});