var mongoose = require('mongoose');

/* ******************************************************
	USER SCHEMA
	***************************************************** */

var userSchema = new mongoose.Schema({
	name: String
	,email: { type: String, unique: true}
	,createdOn: { type: Date, default: Date.now }
	,modifiedOn: Date
	,lastLogin: Date
});

// Build the User model
module.exports = mongoose.model('User', userSchema);