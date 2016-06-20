
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_table', function(table){
    table.increments();
    table.integer('user_id').unsigned().references('user_table.id')
    table.string('body');
    }
  )
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post_table')

};
