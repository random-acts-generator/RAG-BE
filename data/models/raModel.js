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


// function peopleCount() {
//   return db('contacts')
//   .count('id as amount')
//   // .where({ related: relation })
//   .then(function(total) {
//     total[0].amount    
//   })
// }

// function actCount() {
//   return db('acts')
//   .count('id as amount')
//   // .where({ related: relation })
// }
// function generate() {
//   let people = peopleCount()
//   let act = actCount()
//   console.log(people, act.value, 'numbers')
//   let randomPerson = Math.floor((Math.random() * people) + 1);
//   let randomAct = Math.floor((Math.random() * act) + 1);
  
// }