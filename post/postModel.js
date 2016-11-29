'use strict'

var mongoose = require('mongoose');
var CategoryModel = require('./categoryModel');
var CommentModel = require('./commentModel');
var userSchema = require('./userSchema');

var PostSchema = new mongoose.Schema({
  user: userSchema,
  content: {
    title: String,
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: CategoryModel },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: CommentModel }],
}, {
    timestamps: true
  });

module.exports = mongoose.model('Post', PostSchema);
