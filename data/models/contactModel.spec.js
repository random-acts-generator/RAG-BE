//import the configurations and the table that should be used for tests
const db = require('../dbConfig');
const Contacts = require('./contactModel');

//should be done in this order to optimize speed
//insert, get, update, delete
describe('contacts model', () => {
  //remove all the data in the table before starting and after finishing test
  beforeAll(async () => { await db('contacts').truncate() })
  afterAll(async () => { await db('contacts').truncate() });

  describe('insert()', () => {
      it('should insert provided contacts', async () => {
      let test1 = await Contacts.insert({ contactFirst: 'test', contactLast: 'account1', contactPhone:'333-333-4444', relation: 'family', user_id: 1})
      expect(test1.relation).toBe('family')
      
      let test2 = await Contacts.insert({ contactFirst: 'tester', contactLast: 'account2', contactPhone:'333-333-5555', relation: 'friend', user_id: 1})
      expect(test2.contactFirst).toBe('tester')
    
      let test3= await Contacts.insert({ contactFirst: 'tested', contactLast: 'account3', contactPhone:'333-333-3333', relation: 'coworker', user_id: 1})
      expect(test3.contactLast).toBe('account3')
      
      const people = await db('contacts');

      expect(people).toHaveLength(3);
    });
  });

  describe('get()', () => {
    it('provide list', async () => {
      await Contacts.get();

      const people = await db('contacts');

      expect(people).toHaveLength(3);
    });
  });

  describe('get by id', () => {
    it('provides a single person', async () => {
      let person = await Contacts.getById(1)
      expect(person.contactLast).toBe('account1')
    })
  })

  describe('update()', () => {
    it('should update the relation', async () => {
      let update = await Contacts.update('2', {contactPhone:'309-909-8989'});
      expect(update.contactPhone).toBe('309-909-8989');
    })
  })

  describe('delete()', () => {
    it('should delete a contact', async () => {
      await Contacts.remove(2);
      let people = await db('contacts');

      expect(people).toHaveLength(2);
    })
  })
});
