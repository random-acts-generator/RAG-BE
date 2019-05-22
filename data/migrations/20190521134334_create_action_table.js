
exports.up = function(knex, Promise) {
  return knex.schema.createTable('acts', tbl => {
    tbl.increments();

    // nullable data 
    tbl
    .string('description')

    //foreign key
    tbl
    .string('related')
    .unsigned()
    .notNullable()
    // .references('relation')
    // .inTable('contacts')
    // .onDelete('SET NULL')
    // .onUpdate('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('acts')
};
