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
  loginCheck
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
  return db('users')
  // .select('first', 'last', 'phone' )
  .where({ first: surname, last: family })
}

function insert(user) { 
  return db('users')
  .insert( user )
  .then( ids => {
    return getById(ids[0])
  })
}

function update(identifier, change) { 
  return db('users')
  .where({ id: identifier })
  .update(change)
  .then( ids => {
    return getById(ids[0])
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