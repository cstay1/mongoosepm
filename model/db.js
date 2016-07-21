var mongoose = require('mongoose');

var dbName = "mongoosepm";
var dbURI = "localhost:27017/"+ dbName;

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  dbURI = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

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