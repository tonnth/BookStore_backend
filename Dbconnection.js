var mysql=require('mysql');
 //var connection=mysql.createPool({
 
// // host:'localhost',
// //  user:'root',
// //  password:'1234',
// //  database:'websitebansach'


// });

var connection = mysql.createConnection({
    
  host:'us-cdbr-iron-east-05.cleardb.net',
  user: 'ba07e414f4d8e4',
  password:'b51bed0c',
  database:'heroku_1873b262d36b3f6',
  port: '3306'
   
  })
  
  connection.connect(function(err) {
    if (err) console.log(err);
    console.log('You are now connected...')
  })
module.exports=connection;