const express = require('express'),
    router = express.Router(),
    db = require('./database.js');

router.get('/', async (req, res) => {
    try {
        if (res.locals.isAuthenticated) { //로그인 한 경우
            const userEmail = res.locals.currentUser.email;
            //캘린더 리스트 쿼리
            const calendars= await db.promise().query('SELECT * FROM calendar WHERE user_email=?', userEmail);
            //res.send({'calendars':calendars[0]});
            res.render('index',{'calendars':calendars[0],'userEmail':userEmail});
        } else {
            res.render('index')
        }
    }catch(err){
        res.send(err);
    }

    //res.render('index')
});

module.exports = router;