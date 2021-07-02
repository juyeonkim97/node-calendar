const express=require('express');
const router=express.Router();
const db=require('./database.js');
exports.add = (req, res) => {
    var sql = "INSERT INTO event SET ?" // sql 이란 변수안에 쿼리문 날리기
    // db.query(sql, req.body, function (err, results, fields) {
    //     if (err) throw err;
    //     console.log(results); // index.ejs 하고 입력창 및 form 연동
    //     res.redirect('/getlist')
    // })
    console.log(req.body)
};

const express=require('express');
const router=express.Router();

router.get('/',(req, res) => {
    res.render('index',{title:'A'});
});

module.exports=router;