const request = require('supertest');
const db = require('./data/dbConfig')

const server = require('./server');
const auth = '/api/auth'
const users = '/api/users'
const contacts = '/api/contacts'
const acts = '/api/acts'

describe('server', () => {
  beforeAll(async () => { await db('users').truncate() })
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
    describe('post()', () => {
      it('should return 201', async () => { 
        await request(server).post(`${auth}/register`).send({ first: "taco", last: "tuesday", phone: "000-999-8888", email: "mom", password: "hi" });
        await request(server).post(`${auth}/register`).send({ first: "mobile", last: "monday", phone: "000-999-7777", email: "dad", password: "hey" });
        await request(server).post(`${auth}/register`).send({ first: "wicked", last: "wednesday", phone: "000-999-6666", email: "spouse", password: "hello" })
        .expect(201);
      });
      
      it('should return 422 missing info', done => {
        return request(server)
        .post(`${auth}/register`)
        .send({ first: 'PSP' })
        .expect(422, done);
      });
  
      it('should return 200', done => {
        // we return the promise
        return request(server)
        .post(`${auth}/login`)
        .send({ first: "taco", last: "tuesday", phone: "000-999-8888", email: "mom", password: "hi" })
        .expect(200, done);
      });
      
      it('should return 401 unauthorized user', done => {
        return request(server)
        .post(`${auth}/login`)
        .send({ first: 'PSP', password: 'no', email:'hi' })
        .expect(401, done);
      });
    })

    describe('get', () => {
      it('should log out and return ', async () => {
        const res = await request(server).get(`${auth}/logout`);
        expect(res.type).toBe('text/html')
      });
    })
  })

  //set it as post -> get -> put -> delete so that you don't 
  //have to use seed items you can go from a clean table
  describe('user route', () => {    
    describe('get()', () => {      
      it('returns 200', async () => {
        const res = await request(server).get(`${users}`);
        // console.log('info', res)
        expect(res.status).toBe(200);
      });
      
      it('returns a list', async () => {
        const res = await request(server).get(`${users}`)
        expect(res.body.account).toHaveLength(3); 
      });

      //get by id
      it('should return 200', async () => {
        const res = await request(server).get(`${users}/1`);
        expect(res.status).toBe(200);
      });

      it('should return 404', async () => {
        const res = await request(server).get(`${users}/7`);
        expect(res.status).toBe(404);
      });
      
      it('returns a single user', async () => {
        const res = await request(server).get(`${users}/1`)
        expect(res.body.account.first).toBe('taco'); 
      });

      //get by phone number
      it('should return 200', async () => {
        const res = await request(server).get(`${users}/search/num`).send({ phone:'000-999-8888' });
        expect(res.status).toBe(200);
      });

      it('should return 404', async () => {
        const res = await request(server).get(`${users}/search/num`).send({ phone:'pp' });
        expect(res.status).toBe(404);
      });
      
      it('returns a single user', async () => {
        const res = await request(server).get(`${users}/search/num`).send({ phone:'000-999-8888' })
        expect(res.body.account.last).toBe('tuesday'); 
      });

      //get name
      it('should return', async () => {
        const res = await request(server).get(`${users}/search/name`).send({ first:'taco' });
        expect(res.status).toBe(200);
      });

      it('should return', async () => {
        const res = await request(server).get(`${users}/search/name`).send({ last:'all' });
        expect(res.status).toBe(404);
      });
      
      it('returns a list', async () => {
        const res = await request(server).get(`${users}/search/name`).send({ last:'tuesday' });
        expect(res.body.account).toHaveLength(1); 
      });
    })

    describe('put()', () => {
      it('should return 202', async () => {
        const res = await request(server).put(`${users}/1`).send({ first: '3DS' }).expect(202);
        expect(res.body.account.first).toBe('3DS')
      });
      
      it('return a 406', async () => {
        const res = await request(server).put(`${users}/1`).send({ taco:'ll' });
        expect(res.status).toBe(406);
      });

      it('return a 404 missing id', async () => {
        const res = await request(server).put(`${users}/10`).send({ email: 'nindie'});
        expect(res.status).toBe(404);
      });
    })

    describe('delete()', () => {
      it('should return 202', async () => {
        const res = await request(server).delete(`${users}/1`);
        expect(res.status).toBe(202)
      });

      it('return a 404 missing id', async () => {
        const res = await request(server).delete(`${users}/10`);
        expect(res.status).toBe(404);
      });
    })
  });

  //set it as post -> get -> put -> delete so that you don't 
  //have to use seed items you can go from a clean table
  describe('contact route', () => {
    describe('post()', () => {
      it('should return 201', async () => { 
        await request(server).post(`${contacts}`).send({ contactFirst: "taco", contactLast: "tuesday", contactPhone: "000-999-8888", relation: 'test', user_id: 1 });
        await request(server).post(`${contacts}`).send({ contactFirst: "mobile", contactLast: "monday", contactPhone: "000-999-7777", relation: 'test', user_id: 1 });
        await request(server).post(`${contacts}`).send({ contactFirst: "wicked", contactLast: "wednesday", contactPhone: "000-999-6666", relation: 'test', user_id: 1 })
        .expect(203);
      });
      
      it('should return 422 missing info', done => {
        return request(server)
        .post(`${contacts}`)
        .send({ contactFirst: 'PSP' })
        .expect(42, done);
      });
  
      it('should return 200', async () => {
        let res = await request(server).post(`${contacts}`).send({ contactFirst: "tfo", contactLast: "tuy", contactPhone: "000-999-8888", relation: "tea", user_id: 2 })
        .expect(res.body.contacts.email).toBe('tea');
      });
    })

    describe('get()', () => {      
      it('returns 200', async () => {
        const res = await request(server).get(`${contacts}`);
        // console.log('info', res)
        expect(res.status).toBe(20);
      });
      
      it('returns a list', async () => {
        const res = await request(server).get(`${contacts}`)
        expect(res.body.account).toHaveLength(3); 
      });

      //get by id
      it('should return 200', async () => {
        const res = await request(server).get(`${contacts}/1`);
        expect(res.status).toBe(20);
      });

      it('should return 404', async () => {
        const res = await request(server).get(`${contacts}/7`);
        expect(res.status).toBe(44);
      });
      
      it('returns a single user', async () => {
        const res = await request(server).get(`${contacts}/1`)
        expect(res.body.account.contactFirst).toBe('tacs'); 
      });
    })
    
    describe('put()', () => {
      it('should return 202', async () => {
        const res = await request(server).put(`${contacts}/1`).send({ contactFirst: 'vota' }).expect(20);
        expect(res.body.account.contactFirst).toBe('3DS')
      });
      
      it('return a 406', async () => {
        const res = await request(server).put(`${contacts}/1`).send({ taco:'ll' });
        expect(res.status).toBe(40);
      });

      it('return a 404 missing id', async () => {
        const res = await request(server).put(`${contacts}/10`).send({ email: 'nindie'});
        expect(res.status).toBe(44);
      });
    })

    describe('delete()', () => {
      it('should return 202', async () => {
        const res = await request(server).delete(`${contacts}/1`);
        expect(res.status).toBe(22)
      });

      it('return a 404 missing id', async () => {
        const res = await request(server).delete(`${contacts}/10`);
        expect(res.status).toBe(40);
      });
    })
  })

  //set it as post -> get -> put -> delete so that you don't 
  //have to use seed items you can go from a clean table
  describe('acts route', () => {

  })
});
