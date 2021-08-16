const express = require('express');
const crypto = require('crypto');
const passport = require('passport');
const router = express.Router();
const db = require('./database.js');

//회원가입 페이지 이동
router.get('/join', (req, res) => {
    res.render('join');
});

//다른 사용자의 캘린더 추가
router.post('/calendar/:calendarId', (req, res) => {
    const calendarId = req.params.calendarId;
    const userEmail = res.locals.currentUser.email;
    const param = [userEmail, calendarId];
    //사용자에게 이미 추가된 캘린더인지 확인
    db.query('SELECT * FROM user_calendar WHERE user_email=? AND calendar_id=?', param, (err, result) => {
        if (err) console.log(err);
        if (result[0]) { //값이 없으면 캘린더 추가
            res.send({
                message: 'fail'
            })
        } else {
            db.query('INSERT INTO user_calendar(`user_email`,`calendar_id`) VALUES(?,?)', param, (err, result) => {
                if (err) console.log(err)
                res.send({
                    message: 'success'
                })
            })
        }
    });
})


//다른 사용자의 캘린더 삭제(구독 취소)
router.delete('/calendar/:calendarId', (req, res) => {
    const calendarId = req.params.calendarId;
    const userEmail = res.locals.currentUser.email;
    const param = [userEmail, calendarId];
    db.query('DELETE FROM user_calendar WHERE user_email=? and calendar_id=?', param, (err, result) => {
        if (err) console.log(err);
        res.status(200).send({
            result: 'redirect',
            url: '/'
        })
    });
})

//회원가입 시 이메일 중복 체크
router.post('/email-check', (req, res) => {
    const email = req.body.email;
    var message = '';
    db.query('SELECT email FROM user WHERE email=?', email, (err, result) => {
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
router.post('/join', (req, res) => {
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
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;