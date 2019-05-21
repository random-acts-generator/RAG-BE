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
      it('should return 201', done => {
        // we return the promise
        return request(server)
        .post(`${auth}/register`)
        .send({ first: "taco", last: "tuesday", phone: "000-999-8888", email: "mom", password: "hi" })
        .expect(201, done);
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
        expect(res.body.account).toHaveLength(1); 
      });

      //get by id
      it('should return 200', async () => {
        const res = await request(server).get(`${users}/1`);
        expect(res.status).toBe(200);
      });

      it('should return 404', async () => {
        const res = await request(server).get(`${users}/3`);
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
      it('should return 202', done => {
        return request(server)
        .put(`${users}/3`)
        .send({system: '3DS'})
        .expect(202, done);
      });
      
      it('return a 406', async () => {
        const res = await request(server).put(`${users}/2`);
        expect(res.status).toBe(406);
      });

      it('return a 404 missing id', async () => {
        const res = await request(server).put(`${users}/10`).send({system: '3DS'});
        expect(res.status).toBe(204);
      });
    })

    describe('delete()', () => {
      it('should return 200 OK', () => {
        // we return the promise
        return request(server)
        .get(users)
        .expect(200);
      });
      
      it('using the squad (async/await)', async () => {
        // use the squad
        const res = await request(server).get(users);
        expect(res.status).toBe(200);
      });
    })

  });

  //set it as post -> get -> put -> delete so that you don't 
  //have to use seed items you can go from a clean table
  // describe('contact route', () => {
  //   describe('post()', () => {
  //     it('should return 201', done => {
  //       // we return the promise
  //       return request(server)
  //       .post(users)
  //       .send({ title: 'Minecraft', year: 2009, system: 'PC' })
  //       .expect(201, done);
  //     });
      
  //     it('using the squad (async/await)', async () => {
  //       const res = await request(server).post(users).send({ title: 'Borderlands', year: 2009, system: 'PC' });
  //       expect(res.type).toBe('application/json');
  //     });
      
  //     it('should return 422 missing info', done => {
  //       return request(server)
  //       .post(users)
  //       .send({ system: 'PSP' })
  //       .expect(422, done);
  //     });
  //   })

  //   describe('get()', () => {      
  //     it('should return', async () => {
  //       // use the squad
  //       const res = await request(server).get(users);
  //       expect(res.status).toBe(200);
  //     });
      
  //     it('returns a list', async () => {
  //       const res = await request(server).get(users)
  //       expect(res.body.title).toHaveLength(3); 
  //     });
      
  //     it('return the second entry', async () => {
  //       const expected = { "System": "Sega", "Title": "Streets of Rage", "Year": 1990, "id": 2 };
  //       const game = await request(server).get(users)
        
  //       expect(game.body.title[1]).toEqual(expected);
        
  //     });
  //   })

  //   describe('put()', () => {
  //     it('should return 202', done => {
  //       return request(server)
  //       .put(`${users}/3`)
  //       .send({system: '3DS'})
  //       .expect(202, done);
  //     });
      
  //     it('return a 406', async () => {
  //       const res = await request(server).put(`${users}/2`);
  //       expect(res.status).toBe(406);
  //     });

  //     it('return a 404 missing id', async () => {
  //       const res = await request(server).put(`${users}/10`).send({system: '3DS'});
  //       expect(res.status).toBe(204);
  //     });
  //   })

  //   describe('delete()', () => {
  //     it('should return 200 OK', () => {
  //       // we return the promise
  //       return request(server)
  //       .get(users)
  //       .expect(200);
  //     });
      
  //     it('using the squad (async/await)', async () => {
  //       // use the squad
  //       const res = await request(server).get(users);
  //       expect(res.status).toBe(200);
  //     });
  //   })
  // })

  // //set it as post -> get -> put -> delete so that you don't 
  // //have to use seed items you can go from a clean table
  // describe('acts route', () => {

  // })
});
