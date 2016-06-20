var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  knex('post_table').leftJoin('user_table', 'post_table.user_id', 'user_table.id')
  .select(['post_table.body', 'post_table.id', 'user_table.name'])
    .then(function(data){
      console.log(data);
    res.render('index', { title: 'blog post ', blog: data});
  });
})

router.get('/add', function(req, res, next ){
  res.render('add', {title: 'add a new post'})
})

router.post('/add', function(req, res, next){
  knex('user_table').first().returning('id').insert({name:req.body.name})
  .then(function(userid){
    return knex('post_table').insert({body:req.body.body , user_id: userid[0]})
  }).then(function(){
    res.redirect('/');
  }).catch( function(error){
    console.log(error);
  })
})


router.get('/:id/comment', function(req, res , next){
  knex.select('body','comment', 'comment_table.id').from('comment_table').rightJoin('post_table', 'comment_table.post_id', 'post_table.id').where('post_table.id', req.params.id)
  .then( function(data){
    console.log(data);
    res.render('comment', {title: 'add a comment to post:', post_id: req.params.id, comments: data, post: data[0].body});
  })
})

router.post('/:id/comment', function(req, res, next){
 knex('comment_table').first().returning('id').insert({comment:req.body.comment, post_id: req.params.id})
    .then(function(){
      res.redirect('/' + req.params.id + '/comment');
    }).catch(function(error){
      console.log(error);
    })
})


router.get('/:id/delete', function(req, res, next){
  knex('comment_table').where({post_id: req.params.id}).del()
  .then(function(data){
    knex('post_table').where({id: req.params.id}).del()  .then(function(data) {
        res.redirect('/');
      })
  })
})

router.get('/:id/commentdel', function(req, res, next){
  knex('comment_table').where({id: req.params.id}).del()
  .then(function(data){
      res.redirect('/');
  })
})
router.get('/:id/comment_edit', function(req, res, next ){
  knex('comment_table').where({id: req.params.id})
  .then(function(data){
    console.log(data);
    res.render('comment_edit', {comment: data[0].comment, comment_id: data[0].id})
  })
})
router.post('/:id/comment_edit', function(req, res, next ){
  knex('comment_table').where({id: req.params.id}).update(req.body)
  .then(function(data){
    res.redirect('/');
  })
})
router.get('/:id/edit_post', function(req, res, next ){
  knex('post_table').where({id: req.params.id})
  .then(function(data){
    console.log(data);
    res.render('edit_post', {post: data[0]})
  })
})

router.post('/:id/edit_post', function(req, res, next ){
  knex('post_table').where({id: req.params.id}).update(req.body)
  .then(function(data){
    res.redirect('/');
  })
})

module.exports = router;
