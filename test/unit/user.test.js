const userController = require('../../controllers/user_v2')
const httpMocks = require('node-mocks-http')

describe("GET /user/email-check/:email", () => {
    let req = httpMocks.createRequest();
    let res = httpMocks.createResponse();
    // should save the username and password in the database
    // should respond with a json object that contains the id from the database. (probably jwt in the real world)
    test("should respond with a 200 status code", async () => {
        userController.checkEmail(req, res)
        expect(res.statusCode).toBe(200)
    })
    // should specify json as the content type in the http header.
    //url에서 email 추출
    
})