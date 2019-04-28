// const createError = require('http-errors');
const database = require('./database.js');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const registerRouter = require('./routes/register');
const commonStudentsRouter = require('./routes/commonStudent');
const suspendRouter = require('./routes/suspend');
const notificationRouter = require('./routes/notification');
const globalVar = require('./globalvar.js');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/register', registerRouter);
app.use('/api/commonstudents', commonStudentsRouter);
app.use('/api/suspend', suspendRouter);
app.use('/api/retrievefornotifications', notificationRouter);

global.isEmptyObject = globalVar.isEmptyObject

let port
process.env.NODE_ENV !== 'development' ? port = 3001 : port = 4001;
app.listen(port, function () {
  console.log('Server running on port %d', port);
});

module.exports = app;
