const subscriptionModel=require('../models/subscription');
//const db=require('../routes/database');

// exports.subscribeCalendar=async (req, res) => {
//     const calendarId = req.params.calendarId;
//      const userEmail = res.locals.currentUser.email;
//      const param = [userEmail, calendarId];
//      const res=subscriptionModel.checkSubsription(param);
//      if(res){
//          res.send({message:'fail'});
//      }else{
         
//      }
//}

// 캘린더 구독
exports.subscribeCalendar=(req, res) => {
    const calendarId = req.params.calendarId;
    const userEmail = res.locals.currentUser.email;
    const param = [userEmail, calendarId];
    //사용자에게 이미 추가된 캘린더인지 확인
    db.query('SELECT * FROM user_calendar WHERE user_email=? AND calendar_id=?', param, (err, result) => {
        if (err) console.log(err);
        if (result[0]) { //값이 없으면 캘린더 추가
            res.send({
                message: 'fail'
            })
        } else {
            db.query('INSERT INTO user_calendar(`user_email`,`calendar_id`) VALUES(?,?)', param, (err, result) => {
                if (err) console.log(err)
                res.send({
                    message: 'success'
                })
            })
        }
    });
}

// 캘린더구독 취소
exports.cancleSubcription=(req, res) => {
    const calendarId = req.params.calendarId;
    const userEmail = res.locals.currentUser.email;
    const param = [userEmail, calendarId];
    db.query('DELETE FROM user_calendar WHERE user_email=? and calendar_id=?', param, (err, result) => {
        if (err) console.log(err);
        res.status(200).send({
            result: 'redirect',
            url: '/'
        })
    });
}