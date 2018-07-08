const createError =     require('http-errors'),
      express =         require('express'),
      session =         require('express-session'),
      path =            require('path'),
      cookieParser =    require('cookie-parser'),
      logger =          require('morgan'),
      dotenv =          require('dotenv').config()

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const addressesRouter = require('./routes/adresses');
const billRouter = require('./routes/bill')
const stripeRouter = require('./routes/stripeWebhook')

const app = express();

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
//app.set('view engine', 'none');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/css', express.static('public/stylesheets'));
app.use('/img', express.static('public/images'));
app.use('/js', express.static('public/javascripts'));
app.use(session({
    secret: 'pikachu',
    cookie: { maxAge: 14 * 24 * 3600000 },
    resave: true,
    saveUninitialized: true
}))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', indexRouter)
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/addresses', addressesRouter);
app.use('/api/bill', billRouter);
app.use('/api/stripe', stripeRouter);

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
  res.send(err);
});

module.exports = app;
