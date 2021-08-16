const subscriptionController=require("../../controllers/subscription")

describe("캘린더 구독",()=>{
    test("subscribeCalendar 함수가 있을 겁니다.",()=>{
        // subscriptionController.subscribeCalendar의 타입은 함수다.
        expect(typeof subscriptionController.subscribeCalendar).toBe("function")
    })
})