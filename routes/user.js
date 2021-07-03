const express = require('express'),
    crypto = require('crypto');
const router = express.Router();
const db = require('./database.js');

router.get('/join', (req, res) => {
    res.render('join');
});
router.post('/join', (req, res, next) => {
    const param = [req.body.email, req.body.password, req.body.nickname];
    //비밀번호 암호화
    (async()=>{
        crypto.randomBytes(64, (err, buf) => {
            crypto.pbkdf2(param[1], buf.toString('base64'), 108320, 64, 'sha512', (err, key) => {
                if (err) console.log(err)
                console.log(key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='
            });
        });
    })();
    console.log(param);
    db.query('INSERT INTO user(`email`,`password`,`nickname`) VALUES(?,?,?)', param, (err, row) => {
        if (err) console.log(err)
    });
    res.redirect('/');
});

module.exports = router;