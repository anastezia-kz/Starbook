require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require("express-session");
const Mongostore = require("connect-mongo")(session);
const flash = require("connect-flash");
const passport = require('./auth/passport')
const LocalStrategy = require('passport-local').Strategy

mongoose
  //.connect('mongodb://localhost/starbook', {
    .connect(`${process.env.MONGODB_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new Mongostore({
      mongooseConnection: mongoose.connection
    })
  })
);

//handlebar helper

hbs.registerHelper('isSameId', function (value1, value2) {
  console.log({value1, value2});
  return value1.toString() === value2.toString();

});

hbs.registerHelper('toLowerCase', function (value) {
  return value.toLowerCase()
})



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new Mongostore({
      mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
  })
);


const index = require('./routes/index');
app.use('/', index);

const postRouter = require('./routes/post')
app.use('/', postRouter)

const authRouter = require("./routes/auth");
app.use("/", authRouter);

const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter)

const userRouter = require('./routes/user');
app.use('/', userRouter);

const newsRouter = require('./routes/newsfeed');
app.use('/newsfeed', newsRouter)

const photoRouter = require('./routes/photo').router;
app.use('/photo', photoRouter)

module.exports = app;