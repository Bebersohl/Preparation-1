require('dotenv').config();

var express = require('express');
var app = express();
var mongoose = require('mongoose');

//var api = require('./routes/api'); Not sure if api is still relevant
var account = require('./routes/account')
var database = require('./routes/database');
var index = require('./routes/index');
var games = require('./routes/games');
var characters = require('./routes/characters');

//mongoose
mongoose.connect(process.env.DB_CONNECTION);

//verify mongoose connection
mongoose.connection.on('connected',function(){
  console.log('Mongoose connected');
});

//setup ejs
app.set('view engine','pug');

//static files
app.use(express.static('./public'));

//routes
//app.use('/api',api); Not sure if api is still relevant

app.use('/', index);
app.use('/account', account);
app.use('/games', games);
app.use('/characters', characters);
app.use('/database',database);

//listen to a port
app.listen(3000);
console.log("Listening to port 3000");
