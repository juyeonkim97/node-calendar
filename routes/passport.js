const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    crypto = require('crypto'),
    db = require('./database');

passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true,
    session: true
}, (req, email, password, done) => {
    const sql = 'SELECT * FROM user WHERE EMAIL=?';
    db.query(sql, email, (err, result) => {
        if (err) return done(err);
        if (!result[0]) { //값이 없으면
            return done(null, false,{
                'message': '비밀번호를 확인해주세요.'
            });
        };
        const user = result[0];
        crypto.pbkdf2(password, user.salt, 108320, 64, 'sha512', (err, key) => {
            if (err) console.log(err);
            if (key.toString('base64') === user.password) {
                return done(null, user);
            } else {
                return done(null, false, {
                    'message': '비밀번호를 확인해주세요.'
                });
            };
        });
    });
}));

module.exports = passport