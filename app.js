// index.js
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
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

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts')); // 1

// Port setting
var port = 3000;

app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});

