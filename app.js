// let createError = require('http-errors');
let database = require('./database.js');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let http = require('http');

let registerRouter = require('./routes/register');
let commonStudentsRouter = require('./routes/commonStudent');
let suspendRouter = require('./routes/suspend');
let notificationRouter = require('./routes/notification');
let globalVar = require('./globalvar.js');

let app = express();
let server = http.createServer(app);

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
