import request from 'supertest';
import app from '../server.js';
describe("user tests for login register",()=>{
  it('Post user /register ', ()=>{
    return request(app)
    .post('/api/user/register')
    .send({
      name:'user1',
      email:'user1@user.user',
      password:'user',
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response)=>{
      expect(response.body).toEqual(
        expect.objectContaining({
          user:'user1',
          token,
        })
      )
    })
  })
  it('Post user /login user', ()=>{
    return request(app)
    .post('/api/user/login')
    .send({
      email:'user1@user.user',
      password:'user',
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((response)=>{
      expect(response.body).toEqual(
        expect.objectContaining({
          user:'user1',
          token,
        })
      )
    })
  })
  it('Get user /getuser ',()=>{
    return request(app)
    .get('/api/user/getuser')
    .query({'user':{'id':'660c3ce05d723efe43db83b0'}})
    .expect('Content-Type',/json/)
    .expect(200)
    .then((response)=>{
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            resetToken: expect.any(String)
          })
        ])
      )
    })
  })
})