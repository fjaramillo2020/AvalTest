import request from "supertest"
import api from "./index.js"
const { getSpells } =  require('./service/spells.js');

jest.mock('./service/spells.js');

describe("route tests", () => {
  describe("when request /health", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(api).post("/health").send()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({});
    })
  })

  describe("when GET request /harrypotter/spells with good type", () => {
    test("should respond with a 200 status code", async () => {
      const mockSpells = [{ name: 'Spell1', light: 'blue' }, { name: 'Spell2', light: 'red' }];
      getSpells.mockResolvedValue(mockSpells);
  
      const response = await request(api).get("/harrypotter/spells?type=charm&light=blue").send()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(mockSpells);
    })
  })

  describe("when GET request /harrypotter/spells with bad type", () => {
    test("should respond with a 404 status code", async () => {
      const expectedResponse = {
        "message": "type value 'badtype' not allow. Allow values are: none,charm,conjuration,spell,transfiguration,healingspell,darkcharm,jinx,curse,magicaltransportation,hex,counterspell,darkarts,counterjinx,countercharm,untransfiguration,bindingmagicalcontract,Vanishment", 
        "status": "error"
      };
  
      const response = await request(api).get("/harrypotter/spells?type=badtype").send()

      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual(expectedResponse);
    })
  })

  describe("when POST request /harrypotter/spells without all parameters", () => {
    test("should respond with a 403 status code", async () => {
      const expectedResponse = {
        "message": "one or more parameters not found. Check minimum body parameters: : id,name,incantation,effect,canBeVerbal,type,light", 
        "status": "error"
      };
  
      const response = await request(api).post("/harrypotter/spells").send({
        'id': 'aaa3cb46-c174-4843-a07e-fd83545dce58',
        'name': 'Cry Charm',
        'incantation': 'Aberto',
        'effect': 'Cry',
        'canBeVerbal': true,
        'type': 'Charm'
      })

      expect(response.statusCode).toBe(403)
      expect(response.body).toEqual(expectedResponse);
    })
  })

})