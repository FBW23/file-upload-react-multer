var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// express.static lets you serve files and whole folders
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
// /uploads/filename1
// /uploads/filename2

app.use('/', indexRouter);
app.use('/users', usersRouter);

// GENERIC ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({error: err.message || err})
})

module.exports = app;
