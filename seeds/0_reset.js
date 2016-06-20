
exports.seed = function(knex, Promise) {
    return knex('comment_table').del()
    .then(function(){
    return knex('post_table').del()
    .then(function(){
      return knex('user_table').del()
    })
  })
};
