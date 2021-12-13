var createError = require('http-errors');
var express = require('express');
var session = require('express-session')
var flash = require('express-flash')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var productRouter = require('./routes/product');
var orderRouter = require('./routes/order');
var reviewRouter = require('./routes/review');

var app = express();

//User information (akan diganti dengan passport session)
// var user_session = {
//   id: null
// }

app.use(session({
    secret:'sdlalnqoihnaflk334asd',
    resave: false,
    saveUninitialized: false
}))

//Setting passport (dilakukan sebelum router dan view engine)
const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())

//setting flash
app.use(flash())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   console.log(user_session)
//   req.user_session = user_session
//   next()
// })

// app.use('/', (req, res, next) => {
//   req.user_session = user_session
//   next()
// }, homeRouter);

app.use('/', homeRouter)

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.use('/review', reviewRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // res.redirect('/')
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
