var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var session = require('express-session');

var db = require('./model/db');

// Register Schema
var userSc = require('./model/userSchema');
var projSc = require('./model/projectSchema');

var routes = require('./routes/index');
var users = require('./routes/users');
var user = require('./routes/user');
var project = require('./routes/project');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// using express-session
app.use(session({
  secret: 'keyboard cat'
  ,resave: false
  ,saveUninitialized: true
}));

app.use(function(req, res, next){
  var views = req.session.views;

  if(!views){
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname;
  views[pathname] = (views[pathname] || 0) + 1;
  next();
});

// Make db accesible to router
app.use(function(req, res, next){
  req.db = db;
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// User Routes

app.get('/user', user.index);
app.get('/user/new', user.create);
app.post('/user/new', user.doCreate);
app.get('/user/edit', user.edit);
app.post('/user/edit', user.doEdit);
app.get('/user/delete', user.confirmDelete);
app.post('/user/delete', user.doDelete);
app.get('/login', user.login);
app.post('/login', user.doLogin);
app.get('/logout', user.doLogout);

// Project Routes
app.get('/project/new',project.create);
app.post('/project/new', project.doCreate);
app.get('/project/:id', project.displayInfo);
app.get('/project/edit/:id', project.edit);
app.post('/project/edit/:id', project.doEdit);
app.get('/project/delete/:id', project.confirmDelete);
app.post('/project/delete/:id', project.doDelete);
app.get('/project/byuser/:userid', project.byUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
