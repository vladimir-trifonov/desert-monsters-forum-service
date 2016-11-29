'use strict'

var Post = require('./postModel');
var Category = require('./categoryModel');
var Comment = require('./commentModel');

module.exports = {
    // add new category if not existing
    newCategory: function (req, res) {
        Category.findOne({ name: req.body.name }, function (err, category) {
            if (err) {
                return res.sendStatus(500);
            }

            if (!category) {
                var newCategory = new Category({
                    name: req.body.name,
                });

                newCategory.save((err) => {
                    if (err) {
                        return res.sendStatus(500);
                    }

                    return res.json({
                        ok: true,
                        category: newCategory
                    });
                });
            } else {
                return res.status(409).json({
                    ok: false,
                    message: "existing category"
                });
            }
        });
    },

    // publish new post
    newPost: function (req, res) {
        Category.findOne({ "_id": req.params.categoryId }, function (err, category) {
            if (err) {
                return res.sendStatus(500);
            }

            var newPost = new Post({
                user: req.user,
                content: {
                    title: req.body.title
                },
                category: category
            });

            newPost.save((err, saved) => {
                if (err) {
                    return res.sendStatus(500);
                }

                res.json({
                    ok: true,
                    post: saved
                });
            });
        });
    },

    // post new comment
    newComment: function (req, res) {
        var post = Post.findByIdAndUpdate({ "_id": req.params.postId }, {
            $push: {
                comments: {
                    user: req.user,
                    content: {
                        text: req.body.comment
                    }
                }
            }
        }, { safe: true, upsert: true, new: true },
            function (err, comment) {
                if (err) {
                    return res.sendStatus(500);
                }

                return res.json({
                    ok: true,
                    comment: comment
                });
            });
    },

    // get all categories
    getCategories: function (req, res) {
        Category.find().sort({ 'name': 'asc' })
            .exec((err, categories) => {
                if (err) {
                    return res.sendStatus(500);
                }

                res.json({
                    ok: true,
                    categories: categories
                });
            })
    },

    // get posts by selected category id
    getPosts: function (req, res) {
        var categoryId = req.params.categoryId;

        Post.find({ "category": categoryId }).sort({ 'timestamps': 'desc' }).exec((err, posts) => {
            if (err) {
                return res.sendStatus(500);
            }

            res.json({
                ok: true,
                posts: posts
            });
        });
    }
}