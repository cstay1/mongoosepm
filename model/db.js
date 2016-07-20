var mongoose = require('mongoose');

var dbName = "mongoosepm";
var dbURI = "localhost:27017/"+ dbName;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
  console.log('db : Mongoose connected to: ' + dbURI);
});

mongoose.connection.on('error', function(err){
  console.log('db : Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function(){
  console.log('db : Mongoose disconnected');
});