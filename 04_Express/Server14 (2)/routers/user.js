const express = require('express');
const router = express.Router();
const { Post, User, Hashtag } = require('./middleware');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

// 로그인유저(나)가 전달된 :id 주인공을 팔로우 하겠습니다.
router.get('/follow/:id', isLoggedIn, async (req,res,next) => { // 조회이므로 try~catch, 동기식 실행 async/await - 이 함수가 끝나고 아래 명령 실행!
    try{
        // 1. 로그인 유저의 id(번호) 조회
        // 2. follow 테이블에 로그인유저(followerId)와 작성자유저(followingId)로 레코드 추가
        // 로그인유저의 객체로 작성자 유저를 한 번에 follow 테이블 레코드 추가하는 명령을 사용
        
        // 로그인 유저 조회 - loginuser 변수에 객체 저장
        const loginuser = await User.findOne({
            where : { id : req.user.id },
        });

        await loginuser.addFollowings( parseInt( req.params.id, 10 ) ); // id가 텍스트로 왔기 때문에 10진수로 숫자형으로 변경
        // Model 에 정의해놓은 as : 'Followings' 에 따른 메서드가 만들어짐.
        // setFollowing 수정 메서드 getFollowings 읽기 조회 
        // removeFollowings 삭제
        // 복수면 [] 사용
        res.send('success');


    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;