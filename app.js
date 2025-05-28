require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var recipiesRouter = require('./routes/recipies')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var mongoose = require('mongoose')
const mongodb_connection = process.env.MONGODB;
mongoose.connect(mongodb_connection)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error: '))
// When the connection is complete a message will be shown in the console 
db.once('open', function(callback) {
  console.log('Connection succeded!')
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/recepies', recipiesRouter);
app.use(cors({
  origin: 'https://elinaols.github.io/RN-kitchen_archive/'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;