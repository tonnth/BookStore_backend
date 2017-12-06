var db = require('../Dbconnection');

var KhachHang={
	getAllKhachHang:function(callback){
		return db.query("Select * from KhachHang",callback);
	},
	getKhachHangById:function(id,callback){
		return db.query("select * from KhachHang where MaKhachHang=?",[id],callback);
	},
	getHoaDonByMaKhachHang:function(MaKhachHang,callback){
		return db.query("select * from HoaDon where MaKhachHang=?",[MaKhachHang],callback);
	},

};
 module.exports=KhachHang;