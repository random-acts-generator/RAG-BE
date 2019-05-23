//import db configurations
const db = require('../dbConfig');

//export the functions 
module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
}


//define the functions
function get() { 
  return db('contacts')
  // .select('first', 'last', 'phone');
}

function getById(identifier) { 
  return db('contacts')
  .where({ id: identifier })
  .first()
}

function insert(user) { 
  return db('contacts')
  .insert( user, 'id')
  .then( ids => {
    console.log(ids[0])
    return getById(ids[0])
  })
}

function update(identifier, change) { 
  return db('contacts')
  .where({ id: identifier })
  .update(change)
  .then( () => {
    return getById(identifier)
  })
}

function remove(identifier) { 
  return db('contacts')
  .where({ id: identifier })
  .del()
}
