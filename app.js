// const createError = require('http-errors');
const database = require('./database.js');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const registerRouter = require('./routes/register');
const commonStudentsRouter = require('./routes/commonStudent');
const suspendRouter = require('./routes/suspend');
const notificationRouter = require('./routes/notification');
const globalVar = require('./globalvar.js');

const app = express();
const server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/register', registerRouter);
app.use('/api/commonstudents', commonStudentsRouter);
app.use('/api/suspend', suspendRouter);
app.use('/api/retrievefornotifications', notificationRouter);

global.isEmptyObject = globalVar.isEmptyObject

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
  next()
});

process.env.NODE_ENV !== 'development' ? port = 3001 : port = 4001;
server.listen(port, function () {
  console.log('Server running on port %d', port);
});

module.exports = app;
