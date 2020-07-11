var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
require('./config/database');

var notesRouter = require('./app/routes/notes');
var usersRouter = require('./app/routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/notes', notesRouter);
app.use('/users', usersRouter);

module.exports = app;
