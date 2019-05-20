
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    //primary key autoincrement
    tbl.increments();

    //not nullable data
    tbl
    .string('first', 128)
    .notNullable()

    tbl
    .string('last', 128)
    .notNullable()

    //nullable data
    tbl
    .string('number', 15)
    
    //unique data
    tbl
    .string('email', 128)
    .notNullable()
    .unique()

    //sensitive data
    tbl
    .string('password')
    .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
