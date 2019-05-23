//import db configurations
const db = require('../dbConfig');

//export the functions 
module.exports = {
  get,
  getById,
  getByNumber,
  getByName,
  insert,
  update,
  remove,
  loginCheck,
  userContacts,
  userActs
}


//define the functions
function get() { 
  return db('users')
  // .select('first', 'last', 'phone');
}

function getById(identifier) { 
  return db('users')
  .where({ id: identifier })
  .first()
}

function getByNumber(number) { 
  return db('users')
  // .select('first', 'last', 'phone' )
  .where({ phone: number })
  .first()
}

function getByName(surname, family) { 
  if (!surname) {
    return db('users')
    .where({ last: family })
  }
  else if (!family) {
    return db('users')
    .where({ first: surname })
  }
  else {
    return db('users')
    // .select('first', 'last', 'phone' )
    .where({ first: surname, last: family })
  }
}

function insert(user) { 
  return db('users')
  .insert( user, 'id' )
  .then( ids => {
    return getById(ids[0])
  })
}

function update(identifier, change) { 
  return db('users')
  .where({ id: identifier })
  .update(change)
  .then( () => {
    return getById(identifier)
  })
}

function remove(identifier) { 
  return db('users')
  .where({ id: identifier })
  .del()
}

function loginCheck(em) {
  return db('users')
  .where({ email: em })
  .first()
}

// function userContacts(identifier) {
//   let user = db('users')

//   if (identifier) {
//     user.where('id', identifier).first();
    
//     const data = [user, 'contacts:', findContacts(identifier)]
//     return Promise.all(data)
//   }
// }

function userContacts(identifier) {
  return db('contacts')
  .where('user_id', identifier)
  .then( people => people.map(person => { return {...person}}))
}

function userActs(identifier) {
  return db('acts')
  .where('user_id', identifier)
  .then( acts => acts.map(act => { return {...act}}))
}