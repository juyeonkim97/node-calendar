const db = require('../routes/database.js');

// 일정 추가
exports.createEvent=(req, res) => {
    const {
        title,
        start,
        end,
        calendar_id,
        description
    } = req.body;
    const userEmail = res.locals.currentUser.email;
    var param = [title, start, end, calendar_id, description];
    db.query('INSERT INTO event(`title`,`start`,`end`,`calendar_id`,`description`) VALUES(?,?,?,?,?)', param, (err, result) => {
        if (err) console.log(err);
        res.status(200).send();
    });
}

// 모든 일정 가져오기
exports.getAllEvent=(req, res) => {
    if (res.locals.isAuthenticated) { //로그인 한 경우
        const userEmail = res.locals.currentUser.email;
        db.query('SELECT a.event_id,a.title,a.start,a.end,a.description,b.color,b.calendar_id,b.title AS calendar_title FROM event AS a,calendar AS b WHERE a.calendar_id=b.calendar_id AND a.calendar_id IN (SELECT calendar_id FROM user_calendar WHERE user_email=? AND visible="true");', userEmail, (err, result) => {
            if (err) console.log(err);
            if (result) { //값이 있으면
                res.send({
                    resData: result
                })
            }
        });
    } else {
        db.query('SELECT a.event_id,a.title,a.start,a.end,a.description,b.color,b.title AS calendar_title FROM event AS a,calendar AS b WHERE a.calendar_id=b.calendar_id AND a.calendar_id IN (45,46,52)', (err, result) => {
            if (err) console.log(err);
            if (result) { //값이 있으면
                res.send({
                    resData: result
                })
            }
        });
    }
}

// 선택 캘린더 일정 가져오기
exports.getEvent=(req, res) => {
    const calendarId = req.params.calendarId;
    db.query('SELECT event_id,a.title, start,end,a.description,b.title AS calendar_title, color FROM event AS a,calendar AS b WHERE a.calendar_id=b.calendar_id AND a.calendar_id=?;', calendarId, (err, result) => {
        if (err) console.log(err);
        if (result) { //값이 있으면
            res.send({
                resData: result
            })
        }
    });
}

// 일정 수정 권한 있는지 확인
exports.checkEditAuthority= (req, res) => {
    const eventId = req.params.eventId;
    const userEmail = res.locals.currentUser.email;
    const param = [userEmail, eventId];
    console.log('parameter: ' + param)
    var message = '';
    db.query('SELECT * FROM calendar WHERE user_email=? AND calendar_id=(SELECT calendar_id FROM event WHERE event_id=?)', param, (err, result) => {
        if (err) console.log(err);
        if (result[0]) { //값이 있으면
            res.send({
                message: 'success'
            })
        } else {
            res.send({
                message: 'fail'
            })
        }
    });
}

// 일정 수정
exports.updateEvent=(req, res) => {
    const {
        title,
        start,
        end,
        calendar_id,
        description
    } = req.body;
    const eventId = req.params.eventId;
    const param = [title, start, end, calendar_id, description, eventId];
    db.query('UPDATE event SET title=?,start=?,end=?,calendar_id=?,description=? WHERE event_id = ?', param, (err, result) => {
        if (err) console.log(err);
        res.status(200).send();
    });
}

// 일정 삭제
exports.deleteEvent=(req, res) => {
    const eventId = req.params.eventId;
    db.query('DELETE FROM event WHERE event_id=?', eventId, (err, result) => {
        if (err) console.log(err);
        res.status(200).send();
    });
}