const express = require('express'),
    router = express.Router(),
    db = require('./database.js');

router.get('/', async (req, res) => {
    try {
        if (res.locals.isAuthenticated) { //로그인 한 경우
            const userEmail = res.locals.currentUser.email;
            //캘린더 visible 속성 get
            const visibles=await db.promise().query('SELECT visible FROM user_calendar WHERE user_email=?', userEmail);
            //사용자가 생성하거나 추가한 캘린더 리스트(왼쪽 캘린더 리스트용)
            const calendars = await db.promise().query('SELECT * FROM calendar WHERE calendar_id IN (SELECT calendar_id FROM user_calendar WHERE user_email=?)', userEmail);
            //이벤트 추가 시 카테고리에 뜰 사용자가 생성한 캘린더
            const myCalendars = await db.promise().query('SELECT * FROM calendar WHERE user_email=?', userEmail);
            //res.send({'calendars':visibles[0]});
            res.render('index', {
                visibles:visibles[0],
                calendars: calendars[0],
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