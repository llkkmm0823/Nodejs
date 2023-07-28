const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, User, Hashtag } = require('../models');
const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const uploadObj = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads/');
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', uploadObj.single('img'), (req, res, next)=>{
    console.log(`/img/${req.file.filename}`);
    res.json( {url:`/img/${req.file.filename}`} );
});

const uploadObj2 = multer();
// form 안에  <input type="file"> 있기때문에 submit 이 동작하면 파일을 한번 더 업로드하려고 합니다
// 파일 업로드를 생략하기위해 비어있는 multer객체를 만들고  uploadObj2.none() 로 파일 업로드를 생략합니다
router.post('/',  uploadObj2.none(),  async (req, res, next)=>{
    try{
        // 1. posts 테이블에 피드를 레코드로 저장
        const currentPost = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });

        // 2. 입력된 피드의 본문(req.body.content)에서 해시테그만 골라냅니다
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        console.log(hashtags);
        // 3. 해시테그 하나씩  hashtags 테이블에서 검색해서, 이미 있으면 지나가고, 없으면 자동생성 id 와 함께 hashtags테이블에 저장
        if( hashtags ){ // 추출한 해시태그가 하나이상 있다면....
            const result = await Promise.all( 
                hashtags.map( (tag)=>{
                    //tag에 담긴 단어가 hashtags 테이블에 있으면 리턴 없으면 추가하고 리턴
                    return Hashtag.findOrCreate(
                        {
                            where: { title: tag.slice(1).toLowerCase() },  
                        }
                    ); 
                })
            )
            console.log("result : " ,result);
            // 4. 방금추가된 피드의 id 와, 게시물에 사용 해시태그들의 hashtags 테이블에 있는 id를  PostHashTag 테이블에 해시태그 갯수만큼 추가합니다.
            // posts 테이블과 hashtags 테이블의 외래키관계를 이용하여 실행되는 간한단 레코추가 방법입니다.
            await currentPost.addHashtags( result.map( (r)=>r[0] ));
        }
        res.redirect('/');
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;