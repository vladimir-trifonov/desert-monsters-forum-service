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
app.use(jwt({ secret: 'eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhgregergerge3453' }));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./post/postRoutes'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://anybot:sacassdf23r@ds151127.mlab.com:51127/forum-db')
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
      host: 'desertmonstersserviceregistry-93127.onmodulus.net',
      log: function (i, m) {
        console.log(m);
      }
    });

    client.register('desert-monsters-forum-service', '1.0.0', PORT, {
      url: 'localhost:' + PORT
    });
    client.start();

  //}

  console.log('Server listens at port:' + PORT);
});