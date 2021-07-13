const express = require('express'),
    router = express.Router(),
    db = require('./database.js');

//캘린더 추가
router.post('/add', async (req, res) => {
    try {
        const {
            title,
            description,
            color,
            bounds
        } = req.body;
        const userEmail = res.locals.currentUser.email;
        const param = [title, description, color, bounds, userEmail];
        const calendar=db.query('INSERT INTO calendar(`title`,`description`,`color`,`bounds`,`user_email`) VALUES(?,?,?,?,?)', param);
        const calendarId=calendar.calendar_id;
        console.log('calendar 출력'+calendar);
        console.log(calendarId);
        param=[calendarId,userEmail];
        db.query('INSERT INTO user_calendar(`calendar_id`,`user_id`) VALUES(?,?)', param,(err,res)=>{
            if(err) console.log(err);
            console.log('여기 들어옴')
            res.redirect('/');
        });
    } catch (err) {
        res.send(err);
    }
});

//캘린더 검색
router.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    console.log(keyword)
    db.query('SELECT * FROM calendar WHERE (title LIKE ? OR description LIKE ? ) AND bounds = "public"', ['%' + keyword + '%', '%' + keyword + '%'], (err, rows) => {
        if (err) console.log(err)
        //res.send({calendar:rows})
        res.render('calendar_search', {
            calendars: rows,
            keyword: keyword
        });
    });
})
module.exports = router;