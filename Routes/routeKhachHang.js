var express = require('express');
var router = express.Router();
var KhachHang = require('../Models/KhachHang');
var Sach=require(('../Models/KhachHang'))
var crypto = require('crypto');
var db = require('../Dbconnection');
var jwt = require('jsonwebtoken');

//
// router.post('/token?',function(req,res,next)
// {
//     var token = req.body.token;
//     var decoded = jwt.verify(token, 'tohiti');
//     console.log(decoded);
//     Login(decoded.Email, decoded.MatKhau, res);
// });

router.post('/dangky', function (req, res, next)
{
    var md5 = crypto.createHash('md5').update(req.body.MatKhau).digest("hex");
    var query = "INSERT INTO khachhang (HoTenKhachHang,Email,MatKhau,TienNo,LoaiKhachHang,SoXuTichLuy) Values (?,?,?,0,0,0)";
    db.query("select * from khachhang where Email=?", [req.body.Email], function (error, result, fields)
    {
        if (error)
        {
            console.log('có lỗi');

            res.send({
                "message": error,
                "code": "400",
            })
        }
        else
        {
            console.log('không lỗi');
            if (result.length != 0)
            {
                res.send({
                    "message": "Email này đã được sử dụng",
                    "code": "400",
                })

            }
            else
            {

                db.query(query,[req.body.HoTenKhachHang,req.body.Email,md5], function (error, results, fields) {
                    if (error) {
                        //   console.log("error ocurred",error);
                        res.send({
                            "code":400,
                            "message":"Lỗi đăng ký. Vui lòng thử lại."
                        })
                    }else{
                        //   console.log('The solution is: ', results);
                        res.send({
                            "code":200,
                            "message":"Đăng ký thành công",

                        });
                    }
                });
            }
        }
    })
});

function Login(email, mk, res)
{
    var md5 = crypto.createHash('md5').update(mk).digest("hex");
    db.query('SELECT * FROM khachhang WHERE Email = ?', [email], function (error, results, fields)
    {
        if (error)
        {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else
        {
            // console.log('The solution is: ', results);
            if (results.length > 0)
            {
                if (results[0].MatKhau == md5)
                {
                    var user = {
                        MaKhachHang: results[0].MaKhachHang,
                        HoTenKhachHang: results[0].HoTenKhachHang,
                        Email: results[0].Email,
                        MatKhau: md5,
                        SoXuTichLuy: results[0].SoXuTichLuy,
                    }
                    var token = jwt.sign(user, 'tohiti');

                    res.send({
                        "code": 200,
                        "message": "Đăng nhập thành công",
                        "token": token,
                    });
                }
                else
                {
                    res.send({
                        "code": 204,
                        "message": "Email hoặc mật khẩu không đúng"
                    });
                }
            }
            else
            {
                res.send({
                    "code": 204,
                    "message": "Email không tồn tại"
                });
            }
        }
    });
}

router.post('/dangnhap?', function (req, res, next)
{
    Login(req.body.Email, req.body.MatKhau, res);
});

router.get('/thongtin?', function (req, res, next)
{
    console.log('/token');
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'tohiti');
    db.query("select MaKhachHang,HoTenKhachHang,Email,SoXuTichLuy from khachhang where MaKhachHang=?",[decoded.MaKhachHang],function (err,result)
    {
        if(err) res.json(err);
        else
        {
            res.json(result[0]);
        }
    })


});

router.get('/yeuthich?', function (req, res, next)
{
    console.log('/token');
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'tohiti');
    console.log(decoded);
    KhachHang.getDanhSachYeuThich(decoded.MaKhachHang, function (err, rows)
    {
        if (err)
        {
            res.json(err);
        } else
        {
            res.json(rows);
        }
    })

});

function getDanhSachSanPham(MaHoaDon)
{
    var sql = "select * from chitiethoadon INNER join sach  on chitiethoadon.MaSach=sach.MaSach where MaHoaDon=?";
    return new Promise(function (resolve, reject)
    {
        db.query(sql, [MaHoaDon], function (err, result)
        {
            if (err)
            {
                reject(err)
            } else
            {
                resolve(result)
            }
        })
    })
}

router.get('/lichsumuahang?', function (req, res, next)
{
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'tohiti');
    console.log(decoded);
    var dsDonHang = [];
    var donhang;
    db.query("select * from hoadon INNER join phieuthutien  on hoadon.MaHoaDon=phieuthutien.MaHoaDon where hoadon.MaKhachHang = ?", [decoded.MaKhachHang], async function (errorHoaDon, resultHoaDon)
    {
        if (errorHoaDon)
        {
            console.log('Error' + errorHoaDon)
            res.json(errorHoaDon);
        }
        else
        {


            for (i = 0; i < resultHoaDon.length; i++)
            {
                var dsSanPham = [];
                dsSanPham = await getDanhSachSanPham(resultHoaDon[i].MaHoaDon);
                //console.log('Trang thai hien tai la:', trangthai)
                donhang = {
                    MaHoaDon: resultHoaDon[i].MaHoaDon,
                    NgayLapHoaDon: resultHoaDon[i].NgayLapHoaDon,
                    NgayThuTien: resultHoaDon[i].NgayThuTien,
                    TongTienHoaDon: resultHoaDon[i].TongTienHoaDon,
                    DiaChiGiaoHang: resultHoaDon[i].DiaChiGiaoHang,
                    TenNguoiNhan: resultHoaDon[i].TenNguoiNhan,
                    SoDienThoai: resultHoaDon[i].SoDienThoai,
                    SoXuSuDung: resultHoaDon[i].SoXuSuDung,
                    PhiGiaoHang: resultHoaDon[i].PhiGiaoHang,
                    TrangThai: resultHoaDon[i].TrangThai,
                    dsSanPham: dsSanPham,
                }
                dsDonHang.push(donhang);
            }
            res.send(dsDonHang);
        }

    })

});


router.get('/hd/:MaKhachHang?', function (req, res, next)
{
    KhachHang.getHoaDonByMaKhachHang(req.params.MaKhachHang, function (err, rows)
    {
        if (err)
        {
            res.json(err);
        } else
        {
            res.json(rows);
        }
    });
});


router.get('/:id?', function (req, res, next)
{
    if (req.params.id)
    {
        KhachHang.getKhachHangById(req.params.id, function (err, rows)
        {
            if (err)
            {
                res.json(err);
            }
            else
            {
                res.json(rows);
            }
        });
    } else
    {
        KhachHang.getAllKhachHang(function (err, rows)
        {
            if (err)
            {
                res.json(err);
            } else
            {
                res.json(rows);
            }

        });
    }
});


router.post('/dathang?', function (req, res, next)
{
    var noidung ='';
    var token = req.headers.authorization;
    var GioHang =req.body.GioHang;
    var decoded = jwt.verify(token, 'tohiti');
    var TongTien = req.body.TongTienHoaDon;
    // for(i =0; i < GioHang.length; i++)
    // {
    //     TongTien+=GioHang[i].SoLuongBan * GioHang[i].GiaBan;
    // }

    var query = "INSERT INTO hoadon (NgayLapHoaDon,MaKhachHang,MaKhuVucGiaoHang,DiaChiGiaoHang,TenNguoiNhan,SoDienThoai,SoXuSuDung,TongTienHoaDon,PhiGiaoHang) " +
        "Values (?,?,?,?,?,?,?,?,?)";
    var currentdate = new Date();
    db.query(query,[currentdate,decoded.MaKhachHang,req.body.MaKhuVucGiaoHang,req.body.DiaChiGiaoHang,req.body.TenNguoiNhan,req.body.SoDienThoai,req.body.SoXuSuDung,TongTien,0],async function (error,result)
    {
        if(error)
        {
            console.log(error);
            res.json(error);
        }
        else
        {
            for(i=0;i<GioHang.length;i++)
            {
                //Update noidung
                var TenSach = await getTenSach(GioHang[i].MaSach);
                TenSach=TenSach[0].TenSach;
                noidung += GioHang[i].SoLuongBan + ' cuốn '+ TenSach+', ';

                //Update số lượng tồn của đầu sách
                console.log('CẬP NHẬT SỐ LƯỢNG TỒN')
                var soLuongTon = await getSoLuongTon(GioHang[i].MaSach);
                soLuongTon=soLuongTon[0].SoLuongTon;
                console.log('So luong ton cu MS '+GioHang[i].MaSach+' : ',soLuongTon);
                soLuongTon =soLuongTon - GioHang[i].SoLuongBan;

                console.log('so luong ton moi MS' +GioHang[i].MaSach+' : ', soLuongTon);

                var sql = "update sach set SoLuongTon=? where MaSach=?";
                await db.query(sql, [soLuongTon,GioHang[i].MaSach], function (err2, result2)
                {
                    // if(err2) res.json(err2);
                    if(err2)
                    {
                        console.log('Lỗi update số lượng tồn: ',err2);
                    }

                })

                //Tạo các chi tiết hóa đơn
                console.log('TẠO CHI TIẾT HÓA ĐƠN')
                await db.query('insert into chitiethoadon (MaHoaDon,MaSach,SoLuongBan,GiaBanCu) values(?,?,?,?)',[result.insertId,GioHang[i].MaSach,GioHang[i].SoLuongBan,GioHang[i].GiaBan], function (err3, result3)
                {
                    // if(err3) res.json(err3);
                    if(err3)
                    {
                        console.log('Lỗi tạo chi tiết hóa đơn: ', err3);
                    }

                });

                //Cập nhật BR
                console.log('CẬP NHẬT BR KHÁCH HÀNG')
                var brkhachhang = await getBRKhachHang(decoded.MaKhachHang,GioHang[i].MaSach);
                if(brkhachhang.length===0)
                {
                    console.log('Tạo mới brkhachhang');
                    await db.query('insert into brkhachhang (MaKhachHang,MaSach,SoLuongMua) values (?,?,?)', [decoded.MaKhachHang,GioHang[i].MaSach, GioHang[i].SoLuongBan], function (err4,result4)
                    {
                        // if(err4) res.json(err4);
                        if(err4)
                        {
                            console.log('Lỗi tạo mới brkhachhang: ',err4);
                        }

                    })
                }
                else
                {
                    console.log('Update brkhachhang');
                    var soLuongMua=brkhachhang[0].SoLuongMua;
                    console.log('So luong mua cu : ', soLuongMua);
                    soLuongMua=soLuongMua + GioHang[i].SoLuongBan;
                    console.log('So luong mua moi : ', soLuongMua);
                    var query ='update brkhachhang set SoLuongMua='+ soLuongMua +' where MaKhachHang='+ decoded.MaKhachHang+ ' and MaSach='+GioHang[i].MaSach;
                    console.log(query);
                    // await db.query('update brkhachhang set SoLuongMua=? where MaKhachHang=? and MaSach=?',[soLuongMua,decoded.MaKHachHang,GioHang[i].MaSach], function (err5,result5)
                    // {
                    //     // if(err5) res.json(err5);
                    //     if(err5)
                    //     {
                    //         console.log('Lỗi cập nhật brkhachhang: ',err5);
                    //     }
                    //     console.log(result5);
                    // })

                    await db.query(query, function (err5,result5)
                    {
                        // if(err5) res.json(err5);
                        if(err5)
                        {
                            console.log('Lỗi cập nhật brkhachhang: ',err5);
                        }

                    })
                }

            }

            console.log('Tạo phiếu thu tiền');
            await db.query('insert into phieuthutien (MaKhachHang,SoTienThu,NoiDung,TrangThai,MaHoaDon) values(?,?,?,?,?)',[decoded.MaKhachHang,TongTien,noidung,'Chưa thanh toán(Không cho nợ)',result.insertId], function (err6,result6)
            {
                // if(err6) res.json(err6);
                if(err6)
                {
                    console.log('Lỗi tạo phiếu thu tiền: ',err6);
                }

            })



        }
        res.send({'code':' đặt hàng thành công'});

    });

    function getSoLuongTon(MaSach)
    {
        var sql = "select SoLuongTon from sach where MaSach=?";
        return new Promise(function (resolve, reject)
        {
            db.query(sql, [MaSach], function (err, result)
            {
                if (err)
                {
                    reject(err)
                } else
                {
                    resolve(result)
                }
            })
        })
    }
    function getBRKhachHang(MaKhachHang,MaSach)
    {
        var sql = "select * from brkhachhang where MaKhachHang=? and MaSach=?";
        return new Promise(function (resolve, reject)
        {
            db.query(sql, [MaKhachHang,MaSach], function (err, result)
            {
                if (err)
                {
                    reject(err)
                } else
                {
                    resolve(result)
                }
            })
        })
    }

    function getTenSach(MaSach)
    {
        var sql = "select TenSach from sach where MaSach=?";
        return new Promise(function (resolve, reject)
        {
            db.query(sql, [MaSach], function (err, result)
            {
                if (err)
                {
                    reject(err)
                } else
                {
                    resolve(result)
                }
            })
        })
    }
});
module.exports = router;
