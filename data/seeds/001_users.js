
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').delete()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first: 'test', last: 'user', phone: '333-333-3333', email: 'test@me.com', password: 'test'},
        {id: 2, first: 'johnny', last: 'cash', phone: '333-333-3333', email: 'tester@me.com', password: 'new'},
        {id: 3, first: 'cain', last: 'able', phone: '333-333-3333', email: 'tests@me.com', password: 'pass'}
      ]);
    });
};
