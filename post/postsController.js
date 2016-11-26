'use strict'

var Post = require('./postModel');
var Category = require('./categoryModel');
var Comment = require('./commentModel');

module.exports = {

    // add new category if not existing
  newCategory: function(req, res) {

        var check = Category.findOne({name: req.body.name} , function (err, category) {

        });
        
        if(!check){
            var newCategory = new Category(req.category);

            newCategory.save((err) => {
                if(err) {
                    res.status(500).json({
                        message: "failed",
                        error: err
                    });
                }
                
                return res.json({
                    message: "success",
                    category: newCategory
                });
            });
        }else{
            return res.status(409).json({
                message: "existing category",
                
            }
        }
  },

    
    // publish new post
    newPost: function(req, res) {

        var newPost = new Post(req.body);

        newPost.save((err) => {
            if(err) {
                return res.status(500).json({
                        message: "failed",
                        error: err
                    });
            }
            else
                return res.json({
                    message: "success",
                    
                });
            });
    },

    // post new comment
   newComment: function (req, res) {
        var user = req.user;
        var post = Post.findOne({"_id": req.post.id});
        var newComment = new Comment(req.body);

        post.comments.push(newComment);
        post.save();

        return res.json({
                    message: "success",
                    
                });

    },

    // get all categories
    getCategories: function (req, res) {
        Post.find().sort({'name': 'asc'})
            .exec((err, posts) => {
                if(err) {
                    return res.status(500).json({
                        message: "failed",
                        error: err
                    });
                }
            return res.json(categories);
        })
    },

    // get posts by selected category id
    getPosts: function (req, res) {

        var categoryId = req.params.categoryId;

        Post.find({'category.id': categoryId})
            .sort({'timestamps': 'desc'})
            .exec((err, posts) => {
                if(err) {
                    return res.status(500).json({
                        message: "failed",
                        error: err
                    });
                }
                return res.json(posts);
        });

    }

   
}