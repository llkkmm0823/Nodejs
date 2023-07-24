const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/insert', async (req, res, next)=>{
    try{
        const comment = await Comment.create(
            {
                commenter:req.body.id,
                comment:req.body.comment,
            }
        );
        // res.json(comment);
        res.send('ok');
    }catch(err){
        console.log(err);
        next(err);
    }
});

router.get('/', async (req, res, next)=>{
    try{
        // join 을 위해서 주인공테이블과 외래키관계(1:N)관계 테이블의 모델을 include 합니다. 이렇게해서  join효과를 볼수 있습니다
        const comments = await Comment.findAll(
            {
                include:{
                    model:User,
                },
            }
        );
        res.json( comments );
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.patch('/update/:id', async (req, res)=>{
    try{
        const result = await Comment.update(
            {
                comment:req.body.comment,
            },{
                where:{ id:req.params.id },
            }
        );
        res.send('ok');
        // res.json(result);
    }catch(e){
        console.error(err);
        next(err);
    }
});
//6. 수정   update users set comment = '바꿀 내용' where id=2;
// User.update({
//     commnet:'바꿀 내용',
// },{
//     where : {id:2},
// });

// 7. 삭제
// delete from users where id=2
// User.destroy({
//     where : {id:2},
// });




module.exports = router;