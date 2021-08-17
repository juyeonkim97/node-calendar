const express = require('express');
const router = express.Router();
const db = require('./database.js');
const eventController=require('../controllers/event')

//일정 추가
router.post('/', eventController.createEvent);

//모든 일정 가져오기
router.get('/all', eventController.getAllEvent);

//일정 가져오기
router.get('/:calendarId', eventController.getEvent);

//일정 수정 권한 있는지 확인
router.get('/edit-check/:eventId',eventController.checkEditAuthority);

//일정 수정
router.put('/:eventId', eventController.updateEvent);

//일정 삭제
router.delete('/:eventId', eventController.deleteEvent);

module.exports = router;