var db = require('../Dbconnection');

var Sach={
	getAllSach:function(callback){
		return db.query("Select * from sach",callback);
	},
	getSachMoi:function(callback){
		return db.query("Select * from sach where TrangThai = 1",callback);
	},
	getSachKhuyenMai:function(callback){
		return db.query("Select * from sach where KhuyenMai <> 0 and TrangThai <> -1",callback);
	},
	getSachByTheLoai:function(MaTheLoai,callback){
		return db.query("Select *from sach where TrangThai <> - 1 and MaTheLoai=?",[MaTheLoai],callback);
	},getSachById:function(id,callback){
		return db.query("select * from sach where MaSach=?",[id],callback);
	},
	
	timSach:function(chuoiTimKiem,callback){
		chuoiTimKiem=chuoiTimKiem.trim();
		var chuoiGiaBan="Select GiaBan from sach where Giaban > -1";
		if(chuoiTimKiem.includes(">"))
		{
			var giaban = parseInt(chuoiTimKiem.substr(chuoiTimKiem.lastIndexOf(">") + 1,chuoiTimKiem.length).replace(" ", ""));
			if(giaban < 10000) giaban = giaban * 1000;
			chuoiGiaBan= "Select GiaBan from sach where GiaBan < " + giaban;
			chuoiTimKiem=chuoiTimKiem.substr(0, chuoiTimKiem.lastIndexOf(">")).trim();
		}
		if(chuoiTimKiem.includes("<"))
		{
			var giaban = parseInt(chuoiTimKiem.substr(chuoiTimKiem.lastIndexOf("<") + 1,chuoiTimKiem.length).replace(" ", ""));
			if(giaban < 10000) giaban = giaban * 1000;
			chuoiGiaBan= "Select GiaBan from sach where GiaBan < " + giaban;
			chuoiTimKiem=chuoiTimKiem.substr(0, chuoiTimKiem.lastIndexOf("<")).trim();
		}

		var KituTimkiem = "";
		for(i = 0; i < chuoiTimKiem.length;i++)
		{
			if(chuoiTimKiem.charAt(i) != ' ')
			{
				KituTimkiem += chuoiTimKiem.charAt(i) + "%";
			}
		}
		var chuoiTenSach = "Select MaSach From sach where TenSach like N'%" + KituTimkiem + "%'";
		var chuoiTacGia = "Select MaSach From sach where TacGia like N'%" + KituTimkiem + "%'";
		var chuoiMota = "Select MaSach From sach where MoTa like N'%" + KituTimkiem + "%'";
		var chuoiTheLoai = "Select MaTheLoai From theloai where TenTheLoai like N'%" + KituTimkiem + "%'";

		var sql = "Select * from sach where (TrangThai = 1) and ( MaSach in (" + chuoiTenSach + ") or MaSach in (" + chuoiTacGia + ") or MaTheLoai in (" + chuoiTheLoai + ")) and (GiaBan in (" + chuoiGiaBan + "))";
		
		return db.query(sql,callback);

	},
	

};
 module.exports=Sach;