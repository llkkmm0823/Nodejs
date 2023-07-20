const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname,'uploads') ) );

// 파일을 업로드하려면 업로드된 파일이 저장될 폴더를 지정해야합니다.
// 지난 프로젝트처럼 폴더를 직접 만들지는 않습니다. fs 모듈을 이용하여 이용하려는 폴더가 있으면 그폴더를 사용하고, 없으면 새로 생성하는 기능을 이용합니다.
// 파일 폴더와 같은 외부의 리소스를 다루는 작업은 명령 오류와 상관없이 디스크 상태에 따라 오류가 발생할 수 있으며르로 예외처리를 해줍니다. 특히나 지금은  readdirSync 가 실행될때 해당 폴더가 없다면 에러가 발생하므로 그에 대한 처리로 예외처리를 이용합니다.
try{
    fs.readdirSync('uploads');
}catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// 현재 프로젝트에서 사용할  multer  객체를 생성합니다. 객체이름  upload
// multer 함수에 전달인수로 객체하나를 전달하는데 그 객체에는  storage 와  limits 라는 속성이 포함됩니다
// const upload = multer( {  storage:multer.diskStorage(),limits:{}, } );
const upload = multer( {  
    storage:multer.diskStorage(
        {
            //경로 설정에 관한 함수
            //done : 전달인수로 익명함수를 전달받아 done()호출하는 매개변수
            destination(req, file, done) {
                done(null, 'uploads/');    // 폴더 설정
                // 첫번째 인수  null 은 현재파일(file)의 경로와 이름 그데로 사용.
                // (변경 및 추가 없음)
            },  
            filename(req, file, done){
                const ext = path.extname(file.originalname);  // 확장자 추출
                // 확장자를 뺀 파일 이름 + 오늘 날짜(밀리초) + 추출된 확장자 로 저장 파일명 변경
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
                // abc.jpg  -> 'abc' + 123456483 + '.jpg'  -> abc123456483.jpg
                // 업로드 파일명이 같은 경우 cos 처럼 처리할 객체가 없고, 위와 같은 방법으로
                // 파일명의 충돌을 방지합니다 (오늘날짜시간의 밀리초 값)
            },
        }
    ),
    limits:{
        fileSize: 5 * 1024 * 1024
    }, 
} );



app.get('/', (req,res)=>{
    res.sendFile( path.join( __dirname, 'multer.html') );
});


app.post('/upload', upload.single('image'), (req, res)=>{
    console.log( req.file );
    console.log( req.body.title );
    return res.json( { title:req.body.title, filename:req.file.filename } );
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});