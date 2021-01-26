// index.js
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var util = require('./util');
// passport와 passport-local package는 app.js에 require되지 않고 config의 passport.js에서 require
var passport = require('./config/passport'); //1
var flash = require('connect-flash'); 
var app = express();



require('dotenv').config();
// DB setting

(async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser : true, useFindAndModify: false, useCreateIndex : true, useUnifiedTopology : true })
    } catch (err) {
      console.log('error: ' + err)
    }
  })()

// Other settings
app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use(flash());
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true, cookie : { secure : false, httpOnly : true}})); //3

app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', util.getPostQueryString, require('./routes/posts')); //util.getPostQueryString미들웨어를 posts route이 request되기 전에 배치
app.use('/users', require('./routes/users'));

// Port setting
var port = 3000;

app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});

