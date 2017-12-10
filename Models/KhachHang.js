var db = require('../Dbconnection');

var KhachHang={
	getAllKhachHang:function(callback){
		return db.query("Select * from khachhang",callback);
	},
	getKhachHangById:function(id,callback){
		return db.query("select * from khachhang where MaKhachHang=?",[id],callback);
	},
	getHoaDonByMaKhachHang:function(MaKhachHang,callback){
		return db.query("select * from hoadon where MaKhachHang=?",[MaKhachHang],callback);
	},

};
 module.exports=KhachHang;