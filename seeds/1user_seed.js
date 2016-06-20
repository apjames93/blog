
exports.seed = function(knex, Promise) {
  return knex('user_table').del()
  .then(function(){
    return Promise.all([
      // Inserts seed entries
      knex('user_table').insert({
         name: 'bob'}),
       knex('user_table').insert({
          name: 'dug'})
      ])
  })
};
