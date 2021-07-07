const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: true
}, (req, email, password, done) => {
    console.log('passport의 local-login : ', email, password)
    var message = '';
    const sql = 'SELECT * FROM user WHERE EMAIL=?';
    db.query(sql, email, (err, result) => {
        if (err) console.log(err);
        if (!result[0]) { //값이 없으면
            message = '해당하는 이메일이 없습니다.';
            return done(null, false, res.send({
                'message': message
            }));
        };
        const user = result[0];
        crypto.pbkdf2(password, user.salt, 108320, 64, 'sha512', (err, key) => {
            if (err) console.log(err);
            if (key.toString('base64') === user.password) {
                message = '로그인 성공';
                return done(null, {
                    email: email,
                    password: password
                })
            } else {
                message = '비밀번호를 확인해주세요.';
                return done(null, false, res.send({
                    'message': message
                }));
            };
        });
    });
}));

passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
});


module.exports = passport