const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first: 'test', last: 'user', phone: '333-333-3333', email: 'rowValue1', password: ''},
        {id: 2, first: 'test', last: 'user', phone: '333-333-3333', email: 'rowValue2', password: ''},
        {id: 3, first: 'test', last: 'user', phone: '333-333-3333', email: 'rowValue3', password: ''}
      ]);
    });
};
