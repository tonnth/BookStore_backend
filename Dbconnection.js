var mysql=require('mysql');
 //var connection=mysql.createPool({
 
// // host:'localhost',
// //  user:'root',
// //  password:'1234',
// //  database:'websitebansach'


// });

var connection = mysql.createConnection({
    
  host:'sql12.freemysqlhosting.net',
  user: 'sql12209460',
  password:'Sl9HcJQxnV',
  database:'sql12209460',
  port: '3306'
   
  })
  
  connection.connect(function(err) {
    if (err) console.log(err);
    console.log('You are now connected...')
  })
module.exports=connection;