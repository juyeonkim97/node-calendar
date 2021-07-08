const express = require('express'), //웹 서버
    indexRouter = require('./routes'),
    userRouter = require('./routes/user'),
    //eventRouter=require('./routes/event'),
    mysql = require('mysql'),
    session = require('express-session'), // 세션 설정
    passport = require('passport'),
    passportConfig = require('./routes/passport'); // 여기


const app = express()
app.use
app.use(express.json()); //밑에 줄까지 body-parser
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public')); //static 폴더로 지정, images 경로를 /public/images라고 하지 않아도 됨
app.use(express.static(__dirname + '/node_modules'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //뷰 엔진으로 ejs 쓰겠다
app.engine('html', require('ejs').renderFile); //html 형식으로 ejs 쓰겠다.
app.use(passport.initialize());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
})); // 세션 활성화
app.use(passport.initialize()); // passport 구동, 초기화
app.use(passport.session()); // 세션 연결

// Custom Middlewares // 3
app.use(function (req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})

// 라우팅
app.use('/', indexRouter);
app.use('/user', userRouter);
//app.use('/event',eventRouter);

app.listen(3000, () => {
    console.debug('App listening on :3000');
});