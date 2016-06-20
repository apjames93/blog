
exports.seed = function(knex, Promise) {
  return knex('comment_table').del()
  .then(function(){
    return Promise.all([
     knex('user_table').select('id'),
     knex('post_table').select('id'),
    ])
  })
    .then(function(data){
      console.log(data);
      var users= data[0]
      var posts = data[1]
      return Promise.all([
        knex('comment_table').insert({
          user_id: users[0].id,
          post_id: posts[1].id,
          comment: "no you are not",
        }),
        knex('comment_table').insert({
          user_id: users[1].id,
          post_id: posts[0].id,
          comment: "good!",
        }),
        knex('comment_table').insert({
          user_id: users[1].id,
          post_id: posts[0].id,
          comment: "not good!",
        }),
        knex('comment_table').insert({
          user_id: users[1].id,
          post_id: posts[0].id,
          comment: "sooo not good!",
        }),
      ])
    })
  };
