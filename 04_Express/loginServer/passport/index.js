const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/LoginUser');
const kakao = require('./kakaoStrategy');

module.exports = () => {    
    passport.serializeUser( (user, done) => {  
        done(null, user.email); 
        });

    passport.deserializeUser((email, done) => {
        User.findOne({
            where : { email }})    
        .then((user) => done(null, user))
        .catch((err) => done(err));
    });

    local();
    kakao();
};