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
    getDanhSachYeuThich:function(id,callback){
		var query="Select * from sach inner join brkhachhang on brkhachhang.MaSach = sach.MaSach where MaKhachHang=? and YeuThich <> 0 and TrangThai <> -1"
        return db.query(query,[id],callback);
    },

};
 module.exports=KhachHang;