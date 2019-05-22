
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', tbl => {
    //primary key
    tbl.increments();

    //not nullable data
    tbl
    .string('contactFirst', 128)
    .notNullable()

    tbl
    .string('contactLast', 128)
    .notNullable()

    //nullable data
    tbl
    .string('contactPhone', 15)

    //unique data
    tbl
    .string('relation', 128)
    // .notNullable()
    // .unique()

    //foreign key
    tbl
    .integer('user_id')
    // .unsigned()
    // .notNullable()
    // .references('id')
    // .inTable('users')
    // .onDelete('SET NULL')
    // .onUpdate('CASCADE')
  }) 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('contacts');
};
