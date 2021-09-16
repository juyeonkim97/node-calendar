const express = require('express');
const crypto = require('crypto');
const passport = require('passport');
const router = express.Router();
const userController=require('../controllers/user')

//회원가입 페이지 이동
router.get('/join', userController.join);

//회원가입 시 이메일 중복 체크
router.get('/email-check/:email', userController.checkEmail);

//회원가입 처리
router.post('/join', userController.createUser);

// 로그인
router.post('/login', userController.login);

// 카카오 로그인
router.get('/kakao',userController.kakao);

// 카카오 인증 완료
router.get('/oauth',userController.oauth);

//로그아웃
router.get('/logout', userController.logout);

module.exports = router;