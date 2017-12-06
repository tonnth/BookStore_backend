var db = require('../Dbconnection');

var Sach={
	getAllSach:function(callback){
		return db.query("Select * from Sach",callback);
	},
	getSachMoi:function(callback){
		return db.query("Select * from Sach where TrangThai = 1",callback);
	},
	getSachKhuyenMai:function(callback){
		return db.query("Select * from Sach where KhuyenMai <> 0 and TrangThai <> -1",callback);
	},
	getSachByTheLoai:function(MaTheLoai,callback){
		return db.query("Select *from Sach where TrangThai <> - 1 and MaTheLoai=?",[MaTheLoai],callback);
	},
	getSachById:function(id,callback){
		return db.query("select * from Sach where MaSach=?",[id],callback);
	},
	

};
 module.exports=Sach;