var mongoose = require('mongoose');

/* *******************************************************
	PROJECT SCHEMA
   ******************************************************* */

var projectSchema = new mongoose.Schema({
	projectName: String
	,createdOn: { type: Date, default: Date.now }
	,modifiedOn: Date
	,createdBy: String
	,contributors: String
	,tasks: String
});

// Build the Project model
module.exports = mongoose.model('Project', projectSchema);