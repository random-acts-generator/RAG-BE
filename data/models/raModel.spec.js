//import the configurations and the table that should be used for tests
const db = require('../dbConfig');
const Acts = require('./raModel');

//should be done in this order to optimize speed
//insert, get, update, delete
describe('acts model', () => {
  //remove all the data in the table before starting and after finishing test
  beforeAll(async () => { await db('acts').truncate() })
  afterAll(async () => { await db('acts').truncate() });

  describe('insert()', () => {
      it('should insert provided entries', async () => {
      let test1 = await Acts.insert({ description: 'something about the person makes me want to help', related: 'family', user_id: 2})
      expect(test1.related).toBe('family')
      
      let test2 = await Acts.insert({ description: 'something about the person makes me want to help', related: 'friend', user_id: 1})
      expect(test2.related).toBe('friend')
    
      let test3= await Acts.insert({ description: 'something about the person makes me want to help', related: 'coworker', user_id: 3})
      expect(test3.related).toBe('coworker')
      
      const actions = await db('acts');

      expect(actions).toHaveLength(3);
    });
  });

  describe('get()', () => {
    it('provide list', async () => {
      await Acts.get();

      const actions = await db('acts');

      expect(actions).toHaveLength(3);
    });
  });

  describe('get by id', () => {
    it('provides a single action', async () => {
      let act = await Acts.getById(3)
      expect(act.related).toBe('coworker')
    })
  })

  describe('update()', () => {
    it('should update the relation', async () => {
      let update = await Acts.update('2', {related:'spouse'});
      expect(update.related).toBe('spouse');
    })
  })

  describe('delete()', () => {
    it('should delete a act', async () => {
      await Acts.remove(2);
      let actions = await db('acts');

      expect(actions).toHaveLength(2);
    })
  })

  // describe('generate', () => {
  //   it('should return a random act and person', async () => {
  //     let thiss = await Acts.generate()
  //     expect(thiss.body).toBe('something')


  //   })
  // })
});
