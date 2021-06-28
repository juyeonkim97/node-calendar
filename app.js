const express = require('express'), //웹 서버
     routes = require('./routes'),
    mysql = require('mysql'),
    db=require('./public/javascripts/database');
     
const app = express()
app.use(express.json()); //밑에 줄까지 body-parser
app.use(express.urlencoded({extended:true}));
app.use(express.static('public')); //static 폴더로 지정, images 경로를 /public/images라고 하지 않아도 됨
app.use(express.static('node_modules'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //뷰 엔진으로 ejs 쓰겠다
app.engine('html', require('ejs').renderFile); //html 형식으로 ejs 쓰겠다.

// 라우팅
app.get('/', routes.index);

//db 연결 테스트
app.get('/test', (req, res) => {
    db.query('SELECT * from test', (err, results) => {
      if (err) throw error;
      console.log('test query: ', results);
      res.send(results);
    });
  });

app.listen(3000, () => {
    console.debug('App listening on :3000');
});
