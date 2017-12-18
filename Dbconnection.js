var mysql = require('mysql');
 var connection=mysql.createPool({
 
// host:'localhost',
//  user:'root',
//  password:'1234',
//  database:'websitebansach'

     host:'us-cdbr-iron-east-05.cleardb.net',
     user: 'ba07e414f4d8e4',
     password:'b51bed0c',
     database:'heroku_1873b262d36b3f6',
     port: '3306'

});

 
module.exports=connection;
