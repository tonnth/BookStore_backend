var db = require('../Dbconnection');

var HoaDon={
	getAllHoaDon:function(callback){
		return db.query("Select * from hoadon",callback);
	},
	getHoaDonById:function(id,callback){
		return db.query("select * from hoadon where MaHoaDon=?",[id],callback);
	},
	getHoaDonByMaKhachHang:function(MaKhachHang,callback){
		return db.query("select * from hoadon where MaKhachHang=?",[MaKhachHang],callback);
	},

};
 module.exports=HoaDon;