var mongoose = require('mongoose');

/* ****************************************************
   Validation functions
   **************************************************** */

//Chekc Length of name
var isNotTooShort = function(string){
	return string && string.length >= 5;
}

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

projectSchema.path('projectName').required(true);
projectSchema.path('projectName').validate(isNotTooShort, "Is not too short");

/* Asynchronous validator checking against the database*/
projectSchema.path('projectName').validate(function (value, respond) {
  // if the project has a modifiedOn value pass validation as project already exists
  if(this.modifiedOn){
    console.log('Validation passed: ', this);
    respond(true);
  }else{
    // Otherwise check to see if this user already has a project with the same name
    console.log('Looking for projects called ' + value);
    Project.find({projectName: value, createdBy: this.createdBy}, function(err, projects){
      console.log('Number found: ' + projects.length);
      respond(projects.length ? false : true);
    });
  }
}, 'Duplicate projectName');

// Adding static methods
projectSchema.statics.findByUserID = function(userid, callback){
	this.find({createdBy: userid}, '_id projectName', {sort: 'modifiedOn'}, callback);
};

// Build the Project model
var Project = mongoose.model('Project', projectSchema);
module.exports = Project;