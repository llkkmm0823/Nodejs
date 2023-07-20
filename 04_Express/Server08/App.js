const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.set('port', process.env.PORT || 3000);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname,'uploads') ) );

try{
    fs.readdirSync('uploads');
}catch(err){
    console.error('uploads 폴더가 없어서 uploads 폴더를 생성합니다');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage : multer.diskStorage(
        {
            destination(req, file, done) {
                done(null, 'uploads/');   
            },     // 업로드될 폴더 지정
            filename(req, file, done){
                const ext = path.extname(file.originalname); 
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },   // 업로드될 파일 이름 지정
        }  
    ),
    limits:{ fileSize: 5 * 1024 * 1024 },  
});


app.get('/', (req,res)=>{
    res.sendFile( path.join( __dirname, 'fileupload.html') );
});


app.post('/upload', upload.single('image') ,(req, res)=>{
    return res.json({
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        filename:req.file.filename,
    });
});



app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});