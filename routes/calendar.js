const express = require('express'),
    router = express.Router(),
    db = require('./database.js');

//캘린더 추가
router.post('/add', (req, res) => {
    const {
        title,
        description,
        color,
        bounds
    } = req.body;
    const userEmail = res.locals.currentUser.email;
    const param = [title, description, color, bounds, userEmail]
    db.query('INSERT INTO calendar(`title`,`description`,`color`,`bounds`,`user_email`) VALUES(?,?,?,?,?)', param, (err, result) => {
        if (err) console.log(err)
        res.redirect('/');
    });
});

//OR description LIKE=? ['%'+keyword+'%','%'+keyword+'%']
router.get('/search', (req, res) => {
    const keyword = req.body;
    console.log(req.body);
    console.log(keyword);
    db.query('SELECT * FROM calendar WHERE title LIKE=? ', '%'+keyword+'%', (err, rows) => {
        if (err) console.log(err)
        res.send({rows:rows});
    });
    res.render('calendar_search')
})

module.exports = router;