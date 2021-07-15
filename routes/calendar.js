const express = require('express'),
    router = express.Router(),
    db = require('./database.js');

//캘린더 추가
router.post('/', (req, res) => {
    const {
        title,
        description,
        color,
        bounds
    } = req.body;
    const userEmail = res.locals.currentUser.email;
    var param = [title, description, color, bounds, userEmail];
    db.query('INSERT INTO calendar(`title`,`description`,`color`,`bounds`,`user_email`) VALUES(?,?,?,?,?)', param, (err,result) => {
        //insert 문의 id 받기
        const calendarId = result.insertId;
        param = [calendarId, userEmail];
        db.query('INSERT INTO user_calendar(`calendar_id`,`user_email`) VALUES(?,?)', param, (err, next) => {
            if (err) console.log(err);
            res.redirect('/');
        });
    });
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

//캘린더 보이기/숨기기 수정
router.put('/visible', (req, res) => {
    const {
        calendarId,
        visible
    } = req.body;
    const userEmail = res.locals.currentUser.email;
    const param = [visible, calendarId, userEmail];
    console.log(param)
    db.query('UPDATE user_calendar SET visible = ? WHERE calendar_id = ? AND user_email=?', param, (err, next) => {
        if (err) console.log(err);
        res.redirect('/')
    })


})
module.exports = router;