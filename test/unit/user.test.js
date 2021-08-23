const userController = require('../../controllers/user_v2')
const httpMocks=require('node-mocks-http')

describe("GET /user/email-check/:email", () => {
    describe("given a email", () => {
        // should save the username and password in the database
        // should respond with a json object that contains the id from the database. (probably jwt in the real world)
        test("should respond with a 200 status code", async () => {
            let req=httpMocks.createRequest();
            let res=httpMocks.createRequest();
            res=await req(app).get("/user/email-check")
            userController.checkEmail(req,res);
            expect(res.statusCode).toBe(200)
        })
        // should specify json as the content type in the http header.
    })

    describe("when the email is missing", () => {
        // should return a 400 status code to show there was a user error.
        // should return a json object that contains an error message.
        // should specify json as the content type in the http header.
    })

})