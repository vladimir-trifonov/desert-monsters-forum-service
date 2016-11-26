 'use strict'

const mongoose = require('mongoose');
var UserSchema = require('./userModel');

var CommentSchema = new mongoose.Schema({
     'user': {type: mongoose.Schema.Types.ObjectId, ref: UserSchema},
     'content': String,
     'likes': [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}],
},{
  timestamps: true
});



module.exports = CommentSchema;