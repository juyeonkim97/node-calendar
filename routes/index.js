const express = require('express'),
    router = express.Router(),
    db = require('./database.js');

router.get('/', async (req, res) => {
    console.log('dls')
    try {
        if (res.locals.isAuthenticated) { //로그인 한 경우
            const userEmail = res.locals.currentUser.email;

            //사용자가 생성하거나 추가한 캘린더 리스트(왼쪽 캘린더 리스트용)
            const calendars = await db.promise().query('SELECT * FROM user_calendar AS a,calendar AS b WHERE a.calendar_id=b.calendar_id AND a.user_email=b.user_email AND a.user_email=?', userEmail);

            //이벤트 추가 시 카테고리에 뜰 사용자가 생성한 캘린더
            const myCalendars = await db.promise().query('SELECT * FROM calendar WHERE user_email=?', userEmail);
            //res.send({'calendars':calendars[0]});
            res.render('index', {
                calendars: calendars[0],
                userEmail: userEmail,
                myCalendars:myCalendars[0]
            }); 
        } else {
            res.render('index')
        }
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;