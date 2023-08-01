const express = require('express');
const router = express.Router();
const { Post, User, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

// 로그인유저(나)가 전달된  :id 주인공을  팔로우 하겠습니다
router.post('/follow/:id', isLoggedIn, async (req, res, next)=>{
    try{
        // 1. 로그인 유저의 id(번호) 조회
        // 2. follow 테이블에  로그인유저(followerId)와 작성자유저(followingId)로  레코드 추가할 예정....
        // 로그인유저의 객체로  작성자 유저를 한번에 follow 테이블 레코드추가하는 명령을 사용

        // 로그인 유저 조회 -  loginuser 변수에 객체 저장
        const loginuser = await User.findOne({ 
            where : { id: req.user.id },
        }); 

        await loginuser.addFollowings( parseInt( req.params.id , 10 ) );
        // Model 에 정의해놓은 as:'Followingns' 에 따라서 각 매서드가 만들어짐.
        // setFollowing  수정 메서드    getFollowings  읽기 조회
        // removeFollowigs  삭제 
        // 복수면 [] 사용
        res.send('success');
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;