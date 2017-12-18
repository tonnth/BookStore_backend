var db = require('../Dbconnection');

var TheLoai={
    getAllTheLoai:function(callback){
        return db.query("Select * from theloai",callback);
    },

};
module.exports=TheLoai;