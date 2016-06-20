
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_table',
    function(table){
    table.increments();
    table.string('name');
    }
  )
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_table')
};
