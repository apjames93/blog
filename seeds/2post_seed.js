
exports.seed = function(knex, Promise) {
  return knex('post_table').del()
  .then(function(){
    return knex('user_table').select('id');
  })
    .then(function(users){
      console.log(users);
      return Promise.all([
        knex('post_table').insert({
          user_id: users[0].id,
          body: "i am the best around",
        }),
        knex('post_table').insert({
          user_id: users[1].id,
          body: "you suck",
        })
      ])
    })
  };
