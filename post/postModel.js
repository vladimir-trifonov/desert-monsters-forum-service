 'use strict'


const mongoose = require('mongoose');
var CategoryModel = require('./categoryModel');
var CommentModel = require('./commentModel');
var UserSchema = require('./userModel');

var PostSchema = new mongoose.Schema({
  'user': {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'},
  'title': String,
  'content': String, 
  'category': {type: mongoose.Schema.Types.ObjectId, ref: 'CategoryModel'},
  'comments': [{type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel'}],
}, {
   timestamps: true
});



module.exports = mongoose.model('Post', PostSchema);
