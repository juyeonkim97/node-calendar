const express = require('express');
const router = express.Router();
const db = require('./database.js');

router.get('/', async (req, res) => {
    try {
        if (res.locals.isAuthenticated) { //로그인 한 경우
            const userEmail = res.locals.currentUser.email;
            //캘린더 visible 속성 get
            const visibles=await db.promise().query('SELECT visible FROM user_calendar WHERE user_email=?', userEmail);
            //사용자가 생성하거나 추가한 캘린더 리스트(왼쪽 캘린더 리스트용)
            const calendars = await db.promise().query('SELECT * FROM calendar WHERE calendar_id IN (SELECT calendar_id FROM user_calendar WHERE user_email=?)', userEmail);
            //이벤트 추가 시 카테고리에 뜰 사용자가 생성한 캘린더
            const myCalendars = await db.promise().query('SELECT * FROM calendar WHERE user_email=? order by title', userEmail);
            //res.send({'calendars':visibles[0]});
            res.render('index', {
                visibles:visibles[0],
                calendars: calendars[0],
                myCalendars:myCalendars[0]
            });
        } else { //로그인이 안 된 경우 테스트 캘린더를 띄워줌
            const calendars = await db.promise().query('SELECT * FROM calendar WHERE calendar_id in(45,46,52) order by title');
            res.render('index', {
                calendars: calendars[0]
            });
        }
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;