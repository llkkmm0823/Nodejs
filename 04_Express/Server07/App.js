const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static 폴더 설정
app.use('/', express.static( path.join(__dirname, 'uploads') ) );

// 업로드 폴더 생성
// 파일을 업로드 하려면 업로드될 폴더가 지정되어야합니다.
// spring때 처럼 폴더를 직접 만들지 않습니다. fs 모듈에 있는 기능을 이용해서 폴더를 검색하고 없으면 생성하게 합니다.
// 서버내의 저장장치나 오부 기기와의 통신은 언제든 에러요소가 존재하므로 try-catch 를 사용합니다
// fs 모듈 readdirSync 함수(폴더의 내용을 읽는 기능)를 사용할텐데, 읽을 폴더가 없으면 에러가 발생할꺼고 이를 예외처리해서 폴더를 생성할 예정입니다
try{
    fs.readdirSync('uploads'); 
}catch(e){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

// multer객체를 생성하고, 폴더와 파일이름을 설정
// const upload = multer( { storage:multer.diskStorage({}), limits:{} } );
const upload = multer( 
    { 
        storage:multer.diskStorage(
            {
                // 경로설정에 관한 함수
                // done : 전달인수로 익명함수를 전달받아 done() 호출하는 매개변수
                destination(req, file, done ){
                    done( null, 'uploads/');
                    // multer 모듈에서 done 매개변수에 이미 정해진 익명함수를 전달
                    // 그 익명함수가 뭔지 모르겠지만 전달받은 매개변수이름 done 을 이용해서 호출하면 ( done( null, 'uploads/')  ) 업로드 파일 저장소가 설정완료됩니다.
                },
                // 저장될 파일이름에 관한 함수
                filename(req, file, done){
                    const ext = path.extname(file.originalname);  // 확장자 추출
                    const fn = path.basename(file.originalname, ext) + Date.now() + ext; // 확장자를 제외한 파일이름 + 현재날짜시간 + 확장자
                    done( null, fn );
                    // 저장될 파일이름이 설정됩니다.
                },
            }
        ), 
        limits:{
            fileSize: 5 * 1024 * 1024
        },
    }
);


app.get('/', (req,res)=>{
    res.sendFile( path.join( __dirname, 'multer.html') );
});
app.post('/upload', upload.single('image') , (req, res)=>{
    // upload.single('image') 로 파일을 업로드합니다.
    console.log( req.file.originalname );
    console.log( req.file.filename );
    console.log( req.body.title );
    return res.json( { title:req.body.title, filename:req.file.filename } );
});


app.listen(app.get('port'), () => { console.log(app.get('port'),'포트에서 대기중');});