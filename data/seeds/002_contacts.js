
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').delete()
    .then(function () {
      // Inserts seed entries
      return knex('contacts').insert([
        {id: 1, contactFirst: 'test', contactLast: 'contact', contactPhone: '555-444-0000', relation: 'friend', user_id: 1 },
        {id: 2, contactFirst: 'john', contactLast: 'con', contactPhone: '511-444-0022', relation: 'friend', user_id: 1 },
        {id: 3, contactFirst: 'josh', contactLast: 'doe', contactPhone: '522-444-0033', relation: 'friend', user_id: 1 },
        {id: 4, contactFirst: 'ben', contactLast: 'williams', contactPhone: '566-444-4444', relation: 'family', user_id: 2 },
        {id: 5, contactFirst: 'bret', contactLast: 'stevens', contactPhone: '544-444-8888', relation: 'family', user_id: 2 },
        {id: 6, contactFirst: 'chase', contactLast: 'mcgregor', contactPhone: '533-444-0099', relation: 'family', user_id: 2 }
      ]);
    });
};
