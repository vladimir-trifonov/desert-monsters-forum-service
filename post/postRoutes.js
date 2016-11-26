var express = require('express');
var router = express.Router();
var postController = require('./postController.js');

/*
 * get all categories
 */
router.get('/categories', postController.getCategories);

/*
 *  get posts by selected category id
 */
router.get('/categories/:categoryId/posts', postController.getPosts);

/*
 *  add new category if not existing
 */
router.post('/categories', postController.newCategory);

/*
 * publish new post
 */
router.post('/categories/:categoryId/posts', postController.newPost);

/*
 * post new comment
 */
router.post('/categories/:categoryId/posts/:postId/comments', postController.newComment);

module.exports = router;