const express = require('express'),
    crypto = require('crypto');
const router = express.Router();
const db = require('./database.js');

router.get('/join', (req, res) => {
    res.render('join');
});
router.post('/join', (req, res, next) => {
    const {email,password,nickname}=req.body;
    //const param = [req.body.email, req.body.password, req.body.nickname];
    //비밀번호 암호화
    const salt = crypto.randomBytes(64).toString('base64');
    const hashedPw = crypto.pbkdf2Sync(password, salt, 108320, 64,'sha512').toString('base64');
    /* let salt='';
    let hashedPw='';
    crypto.randomBytes(64, (err, buf) => {
        salt = buf.toString('base64');
        crypto.pbkdf2Sync(password, salt, 108320, 64, 'sha512', (err, key) => {
            hashedPw=key.toString('base64');
        });
    }); */
    const param=[email,hashedPw,nickname,salt];
    console.log(param);
    db.query('INSERT INTO user(`email`,`password`,`nickname`,`salt`) VALUES(?,?,?,?)',param, (err, result) => {
        if (err) console.log(err)
    });
    res.redirect('/');
});
router.post('/emailCheck',(req,res)=>{
    const email=req.body.email;
    var message='';
    db.query('SELECT EMAIL FROM user WHERE `EMAIL`=?',email, (err, result) => {
        if (err) console.log(err)
        if (result.length > 0) {
            message="fail";
        }else{
            message="success";
        }
        res.send({'message':message});
    });  
});
module.exports = router;