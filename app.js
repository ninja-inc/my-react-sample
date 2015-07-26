console.log("app.jp -start");

// using JSX file in ./react/src/*.jsx
require('node-jsx').install({extension: '.jsx', harmony: true})

var reactAsync = require('react-async')

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var reactApp = require('./react/src/app.jsx');

var propState = require('./react/src/propState.jsx');

var app = express();

var React = require('react');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', reactApp);  this does not work.
app.use('/users', users);


app.use('/propState', function(req, res, next) {
  reactAsync.renderToStringAsync(propState.routes(), function(err, markup) {
    console.log("propState.routes:"+propState.routes);
    console.log("req.path:"+req.path);
    if(err) {
      return next()
    }
    return res.send('<!DOCTYPE html>' + markup.replace('%react-iso-vgs%', propState.title.rewind()))
  })
});

//

// render react routes on server
/**
* this conf despatches all path (/, /hoge/, /hoge/foo/) to app.jsx
*/
/*
app.use(function(req, res, next) {
  if(req.query.q) {
    res.redirect('/search/' + req.query.q)
  }  
  try {
    reactAsync.renderToStringAsync(reactApp.routes({path: req.path}), function(err, markup) {
      console.log("reactApp.routes:"+reactApp.routes);
      console.log("req.path:"+req.path);
      if(err) {
        return next()
      }
      return res.send('<!DOCTYPE html>' + markup.replace('%react-iso-vgs%', reactApp.title.rewind()))
    })
  } catch(err) {
    return next()
  }
})
*/

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

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

console.log("app.jp -end");