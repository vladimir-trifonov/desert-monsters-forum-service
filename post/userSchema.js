var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id: String,
	name: String,
	avatar: String
}, { _id: false });

module.exports = userSchema;
