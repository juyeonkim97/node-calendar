const express = require('express');
const router = express.Router();
const db = require('./database.js');
const calendarController=require("../controllers/calendar");

//캘린더 추가
router.post('/', calendarController.createCalendar);

//캘린더 검색
router.get('/search', calendarController.searchCalendar);

//캘린더 미리보기
router.get('/:calendarId', calendarController.previewCalendar);

//캘린더 정보 가져오기
router.get('/info/:calendarId', calendarController.getCalendar);

//캘린더 visible 수정
router.put('/visible', calendarController.updateCalendarVisible);

//캘린더 수정
router.put('/:calendarId', calendarController.updateCalendar);

//캘린더 삭제
router.delete('/:calendarId', calendarController.deleteCalendar);

module.exports = router;