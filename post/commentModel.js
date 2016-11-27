 'use strict'

const mongoose = require('mongoose');
var UserSchema = require('./userModel');

var CommentSchema = new mongoose.Schema({
     'user': {
        'userId': String,
        'name': String,          
      },
     'content': String,
     'likes': [{
        'userId': String,
        'name': String,    
      }],
},{
  timestamps: true
});



module.exports =  CommentSchema;