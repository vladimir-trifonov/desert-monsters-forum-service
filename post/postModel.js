 'use strict'


const mongoose = require('mongoose');
var CategoryModel = require('./categoryModel');
var CommentModel = require('./commentModel');


var PostSchema = new mongoose.Schema({
  'user': {
    'userId': String,
    'name': String,  
  },
  'title': String,
  'content': String, 
  'category': {type: mongoose.Schema.Types.ObjectId, ref: 'CategoryModel'},
  'comments': [
    {'user': {
        'userId': String,
        'name': String,          
      },
     'content': String}],
}, {
   timestamps: true
});



module.exports = mongoose.model('Post', PostSchema);
