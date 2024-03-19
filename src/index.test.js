import request from "supertest"
import api from "./index.js"

describe("POST /users", () => {

  describe("when passed a username and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(api).post("/users").send({ 
        username: "username", 
        password: "password" 
      })
      expect(response.statusCode).toBe(200)
    })
  })

})