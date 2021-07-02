const express=require('express');
const router=express.Router();
const db=require('./database.js');

router.get('/join',(req, res) => {
    res.render('join');
});
router.post('/join',(req, res,next) => {
    const param=[req.body.email,req.body.password,req.body.nickname];
    console.log(param);
    db.query('INSERT INTO user(`email`,`password`,`nickname`) VALUES(?,?,?)',param,(err,row)=>{
        if(err) console.log(err)
    });
    res.redirect('/');
});

module.exports=router;