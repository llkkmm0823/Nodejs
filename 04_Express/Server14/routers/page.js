const express = require('express');
const { Post, User, Hashtag } = require('../models');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middleware');

router.get('/', async (req,res,next)=>{
    try{
        const postList = await Post.findAll(
            {
                include:{
                    model:User,
                    attributes:['id', 'nick'],
                },
                order:[['createdAt', 'DESC']],
            }
        );

        res.render('main', { 
            title : 'NodeGram',
            user : req.user, 
            posts : postList,
            followerCount : req.user ? req.user.Followers.length : 0 ,
            followingCount : req.user ? req.user.Followings.length : 0 ,
            followerIdList  : req.user ? req.user.Followings.map(f => f.id) : [] ,
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});


router.get('/join', isNotLoggedIn, (req, res, next)=>{
    res.render('join', { title: '회원가입 - NodeGram' });
});


router.get('/hashtag', async(req,res,next)=>{
    const query = req.query.hashtag;
    // console.log('hashtag : ', query);
    if(!query){
        return res.redirect('/');
        //전달된 해시테그가 없다면 메인페이지로 되돌아 갑니다
    }
    try{
        // 1. 전달된 해시테그로 hashtags 테이블 검색해서 해당 해시테그의 id를 얻습니다
        const hashtag = await Hashtag.findOne(
            {
                where: { title: query }
            }
        );  
        // hashtag 변수에 검색된 hashtas 테이블의 레코드가 저장됩니다.

        // 2. 그 id로 PostHashtag 테이블에서  hashtagid 필드를 검색합니다.
        // 3. 검색결과에서 PostId만 추출
        // 4. 추출한 PostId로 posts 테이블에서 검색
        let posts = [];  // 최종 검색 결과 post들이  담길 배열

        if ( hashtag ) {  // 1번에서 검색한 결과가 있다면,
            // hashtag 에 있는 레코드로 연결된 post를 바로 검색하는 명령을 씁니다
            posts = await hashtag.getPosts(
                {
                    include:[
                        {
                            model: User
                        }
                    ]
                }
            );  // 검색결과의 hashtag 객체를 갖고, posts 테이블에서 검색하라는 명령입니다.
            // 이명령소게는 2번, 3번, 4번 명령이 내부적으로 실행됩니다.
        }
        return res.render('main', { 
            title : `${query} | NodeGram` ,
            user : req.user, 
            posts : posts,
            followerCount : req.user ? req.user.Followers.length : 0 ,
            followingCount : req.user ? req.user.Followings.length : 0 ,
            followerIdList  : req.user ? req.user.Followings.map(f => f.id) : [] ,
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});


router.get('/profile',  isLoggedIn, (req, res) => {
    res.render('profile', { 
        title: '내 정보 - Nodegram',
        user:req.user, 
        followerCount : req.user ? req.user.Followers.length : 0,   // 팔로워 인원수
        followingCount : req.user ? req.user.Followings.length : 0,  // 팔로잉 인원수
        followerIdList : req.user ? req.user.Followings.map(f => f.id) : [] ,
    });
});

module.exports = router;