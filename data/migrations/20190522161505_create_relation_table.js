
exports.up = function(knex, Promise) {
  return knex.schema.createTable('relations', tbl => {
    tbl.unique('type')
    .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('relations');
};
