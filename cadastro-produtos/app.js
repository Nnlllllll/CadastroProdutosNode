var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriasRouter = require('./routes/categorias');

var app = express();

const { sequelize, Categoria } = require('./models');
const categoriasIniciais = [
  'Informática',
  'Periféricos',
  'Celulares',
  'Áudio',
  'Acessórios'
];

const bancoPronto = sequelize.sync({ alter: true }).then(async () => {
  for (const nome of categoriasIniciais) {
    await Categoria.findOrCreate({ where: { nome } });
  }
});
const produtosRouter = require('./routes/produtos');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  bancoPronto.then(() => next()).catch(next);
});

app.use('/', indexRouter);
app.use('/categorias', categoriasRouter);
app.use('/produtos', produtosRouter);
app.use('/users', usersRouter);

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
