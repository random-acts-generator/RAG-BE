
exports.up = function(knex, Promise) {
  return knex.schema.createTable('acts', tbl => {
    tbl.increments();

    // nullable data 
    tbl
    .string('description')
    
    tbl
    .string('related', 128)
    .unsigned()
    .notNullable()

    //foreign key
    tbl
    .integer('user_id', 128)
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('SET NULL')
    .onUpdate('CASCADE')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('acts')
};
