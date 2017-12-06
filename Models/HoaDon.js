var db = require('../Dbconnection');

var HoaDon={
	getAllHoaDon:function(callback){
		return db.query("Select * from HoaDon",callback);
	},
	getHoaDonById:function(id,callback){
		return db.query("select * from HoaDon where MaHoaDon=?",[id],callback);
	},
	getHoaDonByMaKhachHang:function(MaKhachHang,callback){
		return db.query("select * from HoaDon where MaKhachHang=?",[MaKhachHang],callback);
	},

};
 module.exports=HoaDon;