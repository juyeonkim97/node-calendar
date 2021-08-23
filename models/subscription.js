const db=require('../routes/database');

exports.checkSubsription=async (param)=>{
    const row=await db.promise.query('SELECT * FROM user_calendar WHERE user_email=? AND calendar_id=?', param);
    return row[0];
}

exports.subscribeCalendar