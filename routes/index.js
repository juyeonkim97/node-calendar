exports.index = (req, res) => {
    res.render('index',{title:'A'});
};
//로그인 페이지
exports.login = (req, res) => {
    res.render('login');
};