const express = require('express');
const subscriptionController=require("../controllers/subscription");
const router = express.Router();

//캘린더 구독
router.post("/:calendarId",subscriptionController.subscribeCalendar);

//캘린더 구독 취소
router.delete("/:calendarId",subscriptionController.cancleSubcription);

module.exports = router;