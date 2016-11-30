var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var cors = require('cors');

var PORT = process.env.PORT || 4040;
var app = express();

app.use(cors());
app.use(jwt({ secret: process.env.SECRET }));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./post/postRoutes'));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_CONN_STRING)
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, function () {
  //if (env === 'production') {
    var Thalassa = require('thalassa');
    var client = new Thalassa.Client({
      apiport: 80,
      host: process.env.SERVICE_REGISTRY,
      log: function (i, m) {
        console.log(m);
      }
    });

    client.register('desert-monsters-forum-service', '1.0.0', PORT, {
      url: process.env.HOST
    });
    client.start();

  //}

  console.log('Server listens at port:' + PORT);
});