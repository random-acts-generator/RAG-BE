const request = require('supertest');

const server = require('./server');
const auth = '/api/auth'
const users = '/api/users'
const contacts = '/api/contacts'
const acts = '/api/acts'

describe('server', () => {
  it('sets the environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET /', () => {
    it('should return 200 OK', () => {
      // we return the promise
      return request(server)
        .get('/')
        .expect(200);
    });

    it('should return text using done callback', done => {
      // using the done callback
      request(server)
        .get('/')
        .then(res => {
          expect(res.type).toBe('text/html'); // Content-Type
          done();
        });
    });
  });


  //set it as post -> get -> put -> delete so that you don't 
  //have to use seed items you can go from a clean table
  describe('auth route', () => {

  })

  describe('user route', () => {
    

  });
  describe('contact route', () => {

  })
  describe('acts route', () => {

  })
});
