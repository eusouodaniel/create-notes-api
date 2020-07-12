var express = require('express');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
require('./config/database');

var healthRouter = require('./app/routes/health');
var notesRouter = require('./app/routes/notes');
var usersRouter = require('./app/routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', healthRouter);
app.use('/notes', notesRouter);
app.use('/users', usersRouter);

module.exports = app;
