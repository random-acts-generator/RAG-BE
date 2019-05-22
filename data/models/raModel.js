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
  return db('acts')
  // .select('first', 'last', 'phone');
}

function getById(identifier) { 
  return db('acts')
  .where({ id: identifier })
  .first()
}

function insert(user) { 
  return db('acts')
  .insert( user )
  .then( ids => {
    return getById(ids[0])
  })
}

function update(identifier, change) { 
  return db('acts')
  .where({ id: identifier })
  .update(change)
  .then( () => {
    return getById(identifier)
  })
}

function remove(identifier) { 
  return db('acts')
  .where({ id: identifier })
  .del()
}
