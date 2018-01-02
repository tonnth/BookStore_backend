var mysql = require('mysql');
var connection = mysql.createPool({

    // createPoolhost: 'localhost',
    // user: 'root',
    // password: '1234',
    // database: 'websitebansach',

    // //#Host Heroku
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'ba07e414f4d8e4',
    password: 'b51bed0c',
    database: 'heroku_1873b262d36b3f6',
    port: '3306'

    // //#Host freesqldatabase
    // host:'sql12.freesqldatabase.com',
    // user: 'sql12211607',
    // password:'GHsj9tM2jA',
    // database:'sql12211607',
    // port: '3306'

});
module.exports = connection;
