
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment_table',
  function(table){
   table.increments();
   table.integer('user_id').unsigned().references('user_table.id')
   table.integer('post_id').unsigned().references('post_table.id')
   table.string('comment');
  }
 )
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment_table')
};
