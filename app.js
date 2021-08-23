const express = require('express'); //웹 서버
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const calendarRouter=require('./routes/calendar');
const eventRouter=require('./routes/event');
const subscriptionRouter=require('./routes/subscription');
const mysql = require('mysql');
const flash = require('connect-flash');
const session = require('express-session'); // 세션 설정
const passport = require('passport');
const passportConfig = require('./routes/passport');


const app = express()

app.use
app.use(express.json()); //body-parser 대체
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); //static 폴더로 지정, images 경로를 /public/images라고 하지 않아도 됨
app.use(express.static(__dirname + '/node_modules'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //뷰 엔진으로 ejs 쓰겠다
app.engine('html', require('ejs').renderFile); //html 형식으로 ejs 쓰겠다.


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
})); // 세션 활성화
app.use(passport.initialize()); // passport 구동, 초기화
app.use(passport.session()); // 세션 연결

app.use(flash()); //위치 중요, session 연결한 다음에 위치

//공통로직 부분
app.use(function (req, res, next) { 
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})


// 라우팅
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/calendar', calendarRouter);
app.use('/event',eventRouter);
app.use('/subscription',subscriptionRouter);

module.exports = app;