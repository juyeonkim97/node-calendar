const db = require('../routes/database.js');

// 캘린더 추가
exports.createCalendar=(req, res) => {
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
        db.query('INSERT INTO user_calendar(`calendar_id`,`user_email`) VALUES(?,?)', param, (err) => {
            if (err) console.log(err);
            res.redirect('/')
        });
    });
}

// 캘린더 검색
exports.searchCalendar=(req, res) => {
    const keyword = req.query.keyword;
    db.query('SELECT * FROM calendar WHERE (title LIKE ? OR description LIKE ? ) AND bounds = "public" ORDER BY title', ['%' + keyword + '%', '%' + keyword + '%'], (err, rows) => {
        if (err) console.log(err)
        res.render('calendar_search', {
            title:keyword,
            calendars: rows,
            keyword: keyword
        });
    });
}

// 캘린더 미리보기
exports.previewCalendar=(req, res) => {
    const calendarId = req.params.calendarId;
    res.render('calendar', {
        calendarId: calendarId
    });
}

// 캘린더 가져오기
exports.getCalendar=(req, res) => {
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
}

// 캘린더 visible 수정
exports.updateCalendarVisible=(req, res) => {
    const {
        calendarId,
        visible
    } = req.body;
    const userEmail = res.locals.currentUser.email;
    const param = [visible, calendarId, userEmail];
    db.query('UPDATE user_calendar SET visible = ? WHERE calendar_id = ? AND user_email=?', param, (err, result) => {
        if (err) console.log(err);
        res.status(200).send()
    });
}

// 캘린더 수정
exports.updateCalendar=(req, res) => {
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
}

// 캘린더 삭제
exports.deleteCalendar=(req, res) => {
    const calendarId = req.params.calendarId;
    db.query('DELETE FROM calendar WHERE calendar_id=?', calendarId, (err, result) => {
        if (err) console.log(err);
        res.status(200).send({
            result: 'redirect',
            url: '/'
        })
    });
}