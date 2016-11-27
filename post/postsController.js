'use strict'

var Post = require('./postModel');
var Category = require('./categoryModel');
var Comment = require('./commentModel');
require('../config');

module.exports = {

    // add new category if not existing
  newCategory: function(req, res) {

        Category.findOne({name: req.body.name} , function (err, category) {
                if(err) {
                    res.status(500).json({
                        message: "failed",
                        error: err
                    });
                }
                console.log(category);
                if(!category){
                    var newCategory = new Category({
                        name: req.body.name,
                    });

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
                        message: "existing category"
                        
                    });
                }
        });
        
        
  },

    
    // publish new post
    newPost: function(req, res) {

        Category.findOne({"_id": req.params.categoryId} , function (err, category) {
                if(err) {
                    res.status(500).json({
                        message: "failed",
                        error: err
                    });
                }
                console.log(category);

                var newPost = new Post({
                    user: req.body.user,
                    title: req.body.title,
                    content: req.body.content,
                    category: category
                });

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


        });

     
    },

    // post new comment
   newComment: function (req, res) {
        
        var post = Post.findByIdAndUpdate({"_id": req.params.postId}, {$push: {'comments':{
            'user': req.body.user,
            'content': req.body.content,
        }}},{safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        });

        return res.json({
                    message: "success",
                    
                });

    },

    // get all categories
    getCategories: function (req, res) {
        Category.find().sort({'name': 'asc'})
            .exec((err, categories) => {
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

        Post.find({"category": categoryId}).sort({'timestamps': 'desc'}).exec((err, posts) => {
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