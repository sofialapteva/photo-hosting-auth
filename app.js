// modules//
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const client = require('filestack-js').init('AEU1BtQQVQBOOVeFKP4XZz');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
// imports//
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
// mongoose
const uri = process.env.URI || 'mongodb://localhost:27017/photo-upload';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// server
const app = express();
// middlewares//
app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    key: 'online-magic-cookies',
    store: new MongoStore({
      mongooseConnection: mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET || 's2dnkl86ft5k4Nvk2s',
    cookie: { secure: false },
  }),
);

app.use((req, res, next) => {
  res.locals.login = req.session?.login;
  res.locals.userId = req.session?.userId;
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);

const port = process.env.PORT || 3000;
app.listen(port);
