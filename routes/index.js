const express = require('express'),
    router = express.Router(),
    db = require('./database.js');

router.get('/', (req, res) => {
    // if(res.locals.isAuthenticated){
    //     const userEmail = res.locals.currentUser.email;
    //     db.query('SELECT * FROM calendar WHERE user_email=?', userEmail, (err, rows) => {
    //         if (err) console.log(err)
    //         // res.send(rows)
    //         return res.render('index',{
    //             calendarList:rows
    //         })
    //     });
    // }else{
    //    return res.render('index')
    // }
    res.render('index')
});

module.exports = router;