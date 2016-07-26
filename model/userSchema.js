var mongoose = require('mongoose');

/* ****************************************************
   Validation functions
   **************************************************** */

//Chekc Length of name
var isNotTooShort = function(string){
	return string && string.length >= 5;
}

var validateLength = [{validator: isNotTooShort, msg: "Too short"}];

// External email arification object
var validateEmail = [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"Invalid Email Address"];

/* ******************************************************
	USER SCHEMA
	***************************************************** */

var userSchema = new mongoose.Schema({
	name: { type: String, required: true, validate: validateLength}
	,email: { type: String, unique: true, required: true, validate: validateEmail}
	,createdOn: { type: Date, default: Date.now }
	,modifiedOn: Date
	,lastLogin: Date
});

// Build the User model
module.exports = mongoose.model('User', userSchema);