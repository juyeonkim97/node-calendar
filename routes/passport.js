const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const crypto = require('crypto');
const db = require('./database');
const userController = require('../controllers/user');
const dotenv=require('dotenv')
dotenv.config() //이걸 써야 dotenv를 쓸 수 있음

passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
});

// 로컬 로그인
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: true
}, (req, email, password, done) => {
    const sql = 'SELECT * FROM user WHERE EMAIL=?';
    db.query(sql, email, (err, result) => {
        if (err) return done(err);
        if (!result[0]) { //값이 없으면
            return done(null, false, req.flash('errorMsg', '가입되지 않은 이메일입니다.'));
        };
        const user = result[0];
        crypto.pbkdf2(password, user.salt, 108320, 64, 'sha512', (err, key) => {
            if (err) console.log(err);
            if (key.toString('base64') === user.password) {
                return done(null, user);
            } else {
                return done(null, false, req.flash('errorMsg', '비밀번호를 다시 확인해주세요.'));
            };
        });
    });
}));

// 카카오 로그인
passport.use('kakao-login', new KakaoStrategy({
        clientID: process.env.KAKAO_AUTH_CLIENT_ID, // 이것이 REST API KEY
        callbackURL: process.env.KAKAO_AUTH_CALLBACK_URL // 카카오 인증 완료 후 돌아갈 Redirect URl, http://IP_ADDRESS:3000/user/oauth
    },
    //이 부분부터 /user/oauth 실행내용 
    async (accessToken, refreshToken, profile, done) => {
        //console.log('kakao profile', profile.id); // 꼭 확인해보자!
        email = profile.id; //id를 이메일로 쓰기
        nickname = profile.username; //username을 nickname으로
        param = [email, nickname];
        const sql = 'SELECT * FROM user WHERE EMAIL=?';
        db.query(sql, email, (err, result) => {
            if (err) return done(err);
            if (!result[0]) { //값이 없으면 회원가입 진행 후 로그인 시키기
                db.query('INSERT INTO user(`email`,`nickname`) VALUES(?,?)', param, (err, result) => {
                    console.log('회원가입 완료')
                    if (err) console.log(err)
                    const user = {
                        email: email,
                        nickname: nickname
                    };
                    return done(null, user);
                });
            } else { // 값이 있는 경우 로그인
                const user = result[0];
                return done(null, user);
            }

        })
    }));

module.exports = passport