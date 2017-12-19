

var express = require('express');
var bodyparser = require('body-parser');



var http = require('http');
var connection = require('./Dbconnection');
var routeSach = require('./Routes/routeSach');
var routeKhachHang = require('./Routes/routeKhachHang');
var routeHoaDon = require('./Routes/routeHoaDon');

var routeTheLoai = require('./Routes/routeTheLoai');
var app = express();
app.use(bodyparser.urlencoded({extended: true})); //support x-www-form-urlencoded
app.use(bodyparser.json());
 
app.use('/sach',routeSach);
app.use('/khachhang',routeKhachHang);
app.use('/hoadon',routeHoaDon);
app.use('/theloai',routeTheLoai);
app.use(express.static('img'));



var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening on port ' + server.address().port);
});
module.exports = app;