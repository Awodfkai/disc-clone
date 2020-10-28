const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressBearerToken = require('express-bearer-token')

const { jwtConfig: {secret} } = require('./config')

const routes = require('./routes');

const app = express();

app.use(cookieParser(secret))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(function (err, _req, res, _next) {
  res.status(err.status || 500);
  if (err.status === 401) {
    res.set('WWW-Authenticate', 'Bearer');
  }
  res.json({
    message: err.message,
    error: JSON.parse(JSON.stringify(err)),
  });
});

module.exports = app;
