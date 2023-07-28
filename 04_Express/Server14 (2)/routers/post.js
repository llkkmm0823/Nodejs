const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, User, Hashtag } = require('../models');

const { isLoggedIn, isNotLoggedIn } = require('./middleware');

const router = express.Router();

try{
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const uploadObj = multer({
    storage : multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : { fileSize : 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, uploadObj.single('img'), (req, res, next) => {
    console.log(`/img/${req.file.filename}`);
    res.json( {url : `/img/${req.file.filename}`} );
});

const uploadObj2 = multer();
// form 안에 <input type="file"> 있기 때문에 submit 이 동작하면 파일을 한번 더 업로드하려고 합니다.
// 파일 업로드를 생략하기위해 비어있는 multer 객체를 만들고 uploadObj2.none() 로 파일 업로드를 생략합니다.
router.post('/', isLoggedIn, uploadObj2.none(), async (req, res, next) => {
    try{

        // 1. post 테이블에 피드를 레코드로 저장합니다.
        const currentPost = await Post.create({
            content : req.body.content,
            img : req.body.url,
            UserId : req.user.id,
        });

        // 2. 입력된 피드의 본문(req.body.content)에서 해시태그만 골라냅니다.
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        // content 내용 중 해시태그만 추출한 결과 [ '#여름', '#구두', '#방학', '#신발' ];
        // console.log(hashtags);

        // 3. 해시태그 하나씩 hashtags 테이블에서 검색하고 이미 있으면 지나가고,
        //    없으면 자동생성 id 와 함께 hashtags 테이블에 저장합니다.
        if( hashtags ){ // 추출한 해시태그가 하나이상 있다면....
            const result = await Promise.all(
                hashtags.map( (tag) => {
                    // tag에 담긴 단어가 hashtags 테이블에 있으면 그냥 리턴 없으면 추가하고 리턴
                    return Hashtag.findOrCreate(
                        {
                            where : { title : tag.slice(1).toLowerCase() }, // toLowerCase() : 모두 소문자로 변경
                        }
                    );
                })
            );
            console.log("result : ", result);
            // result 는 배열인데, id와 title로 구성된 객체(findOrCreate의 결과객체)로 구성된 배열

            // 4. 방금 추가된 피드의 id 와 지금 추가된 해시태그 id 를 PostHashTag 테이블에 해시태그 갯수만큼 추가합니다.
            // post 테이블과 hashtags 테이블의 외래키 관계를 이용하여 간단한 레코드 추가 방법입니다.
            await currentPost.addHashtags(result.map( (r) => r[0] ));
        }
        res.redirect('/');
        
    } catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;