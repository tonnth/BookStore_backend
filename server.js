var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var connection = require('./Dbconnection');
var routeSach = require('./Routes/routeSach');



var app = express();
app.use(bodyparser.urlencoded({extended: true})); //support x-www-form-urlencoded
app.use(bodyparser.json());
 
app.use('/sach',routeSach);
app.use(express.static('img'))

var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});

module.exports = app;