const request = require('request');

describe('calc', () => {
  it('should multiply 2 and 2', () => {
    expect(2*2).toBe(4);
  })
})

/* need to pass done, without it test finishes before it even gets a callback -> need to set code as asyncronous */
describe('should return a list, thats not empty', () => {
  it('should return 200 OK', (done) => {
    request.get('http://localhost:3000/messages', (err, response) => {
      console.log(response.body)
      //expect(res.statusCode).toEqual(200)
      expect(JSON.parse(res.body).length).toBeGreaterThan(0)
      done()
    })
  })
})

describe('get messages from user', () => {
  it('should return 200 OK', (done) => {
    request.get('http://localhost:3000/messages/tim', (err, response) => {
      console.log(response.body)
      expect(res.statusCode).toEqual(200)
      done()
    })
  })
  
  it('name should be Tim', (done) => {
    request.get('http://localhost:3000/messages/tim', (err, response) => {
      console.log(response.body)
      expect(JSON.parse(res.body)[0].name).toEqual('tim')
      done()
  })
})
