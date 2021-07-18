const express = require('express'),
    router = express.Router(),
    db = require('./database.js');

//일정 추가
router.post('/', (req, res) => {
    const {
        title,
        start,
        end,
        calendar_id,
        description
    } = req.body;
    const userEmail = res.locals.currentUser.email;
    var param = [title,start,end,calendar_id,description];
    db.query('INSERT INTO event(`title`,`start`,`end`,`calendar_id`,`description`) VALUES(?,?,?,?,?)', param, (err, result) => {
        if(err) console.log(err);
        res.status(200).send();
    }); 
});

//일정 가져옴
router.get('/all', (req, res) => {
    if (res.locals.isAuthenticated) { //로그인 한 경우
        const userEmail = res.locals.currentUser.email;
        db.query('select a.event_id,a.title,a.start,a.end,a.description,b.color,b.title as calendar_title from event as a,calendar as b where a.calendar_id=b.calendar_id and a.calendar_id in (select calendar_id from user_calendar where user_email=? and visible="true");', userEmail, (err, result) => {
            if (err) console.log(err);
            if (result) { //값이 있으면
                res.send({
                    resData: result
                })
            }
        });
    } else {
        db.query('select a.event_id,a.title,a.start,a.end,a.description,b.color,b.title as calendar_title from event as a,calendar as b where a.calendar_id=b.calendar_id and a.calendar_id IN (SELECT calendar_id FROM calendar WHERE bounds="public")', (err, result) => {
            if (err) console.log(err);
            if (result) { //값이 있으면
                res.send({
                    resData: result
                })
            }
        });
    }
})
module.exports=router;