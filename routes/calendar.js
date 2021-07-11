const express = require('express'),
    router = express.Router(),
    db = require('./database.js');

//캘린더 추가
router.post('/add', (req, res) =>{
    console.log('여기는 호출됨');
    const {
        calendarName,
        calendarDesc,
        calendarColor,
        calendarBounds
    } = req.body;
    const userEmail = res.locals.currentUser.email;
    const param = [calendarName, calendarDesc, calendarColor, calendarBounds, userEmail]
    db.query('INSERT INTO calendar(`calendar_name`,`calendar_desc`,`calendar_color`,`calendar_bounds`,`user_email`) VALUES(?,?,?,?,?)', param, (err, result) => {
        if (err) console.log(err)
        res.redirect('/');
    });
});

//캘린더 리스트
router.get('/list',(req,res)=>{
    console.log('이게 호출되기는 함')
    if(res.locals.isAuthenticated){
        const userEmail = res.locals.currentUser.email;
        db.query('SELECT * FROM calendar WHERE user_email=?', userEmail, (err, rows) => {
            if (err) console.log(err)
            // res.send(rows)
            return res.render('index_calendar_list',{
                calendarList:rows
            })
        });
    }else{
       return res.render('index_calendar_list')
    }
})

router.get('/search',(req,res)=>{
    res.render('calendar_search')
})

module.exports = router;