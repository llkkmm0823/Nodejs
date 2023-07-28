const express = require('express');
// const User = require('../models/LoginUser');
// const bcrypt = require('bcrypt');
const passport = require('passport');

const {isNotLoggedIn } = require('./middleware');

const router = express.Router();

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authErr, user, info) => {
        if (authErr) {
            console.error(authErr);
            return next(authErr);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }

        req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/kakaostart', passport.authenticate('kakao'));

router.get('/kakao/callback',
    passport.authenticate(
        'kakao',
        {
            failureRedirect: '/',
        }
    ),  
    (req, res) => {
        res.redirect('/');
    }
);
module.exports = router;