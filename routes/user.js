const express = require('express'),
    crypto = require('crypto'),
    passport = require('passport'),
    router = express.Router(),
    db = require('./database.js');

//회원가입 페이지 이동
router.get('/join', (req, res) => {
    res.render('join');
});

//회원가입 시 이메일 중복 체크
router.post('/email-check', (req, res) => {
    const email = req.body.email;
    var message = '';
    db.query('SELECT EMAIL FROM user WHERE EMAIL=?', email, (err, result) => {
        if (err) console.log(err)
        if (result[0]) { //값이 있으면 해당
            message = "fail";
        } else {
            message = "success";
        }
        res.send({
            'message': message
        });
    });
});

//회원가입 처리
router.post('/join', (req, res, next) => {
    const {
        email,
        password,
        nickname
    } = req.body;
    //const param = [req.body.email, req.body.password, req.body.nickname];
    //비밀번호 암호화
    const salt = crypto.randomBytes(64).toString('base64');
    const hashedPw = crypto.pbkdf2Sync(password, salt, 108320, 64, 'sha512').toString('base64');
    const param = [email, hashedPw, nickname, salt];
    console.log(param);
    db.query('INSERT INTO user(`email`,`password`,`nickname`,`salt`) VALUES(?,?,?,?)', param, (err, result) => {
        if (err) console.log(err)
    });
    res.redirect('/');
});

//로그인
router.post('/login',
    passport.authenticate("local-login", {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    })
);

//로그아웃
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;