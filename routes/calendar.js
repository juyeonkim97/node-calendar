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
    db.query('INSERT INTO calendar(`title`,`description`,`color`,`bounds`,`user_email`) VALUES(?,?,?,?,?)', param, (err, result) => {
        //insert문의 id 받기
        const calendarId = result.insertId;
        param = [calendarId, userEmail];
        db.query('INSERT INTO user_calendar(`calendar_id`,`user_email`) VALUES(?,?)', param, (err, next) => {
            if (err) console.log(err);
            res.redirect('/')
        });
    });
});

//캘린더 검색
router.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    db.query('SELECT * FROM calendar WHERE (title LIKE ? OR description LIKE ? ) AND bounds = "public"', ['%' + keyword + '%', '%' + keyword + '%'], (err, rows) => {
        if (err) console.log(err)
        res.render('calendar_search', {
            calendars: rows,
            keyword: keyword
        });
    });
})

//캘린더 가져오기
router.get('/:calendarId', (req, res) => {
    res.render('calendar')
})

//캘린더 정보 가져오기
router.get('/info/:calendarId', (req, res) => {
    const calendarId = req.params.calendarId;
    const userEmail = res.locals.currentUser.email;
    const param = [calendarId, userEmail];
    console.log('parameter: ' + param)
    var resData = '';
    db.query('SELECT * FROM calendar WHERE calendar_id =? AND user_email=?', param, (err, result) => {
        if (err) console.log(err);
        if (result[0]) { //값이 있으면
            resData = result[0]
            res.send({
                resData: resData
            })
        } else {
            resData = "fail"
            res.send({
                resData: resData
            })
        }
    });
})

//캘린더 visible 수정
router.put('/visible', (req, res) => {
    const {
        calendarId,
        visible
    } = req.body;
    const userEmail = res.locals.currentUser.email;
    const param = [visible, calendarId, userEmail];
    console.log('parameter: ' + param)
    db.query('UPDATE user_calendar SET visible = ? WHERE calendar_id = ? AND user_email=?', param, (err, result) => {
        if (err) console.log(err);
        res.status(200).send({
            result: 'redirect',
            url: '/'
        })
    });
})

//캘린더 수정
router.put('/:calendarId', (req, res) => {
    const {
        title,
        description,
        color,
        bounds
    } = req.body;
    const calendarId = req.params.calendarId;
    const param = [title, description, color, bounds, calendarId];
    db.query('UPDATE calendar SET title=?,description=?,color=?,bounds=? WHERE calendar_id = ?', param, (err, result) => {
        if (err) console.log(err);
        res.status(200).send({
            result: 'redirect',
            url: '/'
        })
    });
})

//캘린더 삭제
router.delete('/:calendarId', (req, res) => {
    const calendarId = req.params.calendarId;
    db.query('DELETE FROM calendar WHERE calendar_id=?', calendarId, (err, result) => {
        if (err) console.log(err);
        res.status(200).send({
            result: 'redirect',
            url: '/'
        })
    });
})



module.exports = router;