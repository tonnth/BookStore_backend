var express = require('express');
var router = express.Router();
var KhachHang = require('../Models/KhachHang');
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
                var token = jwt.sign(req.body, 'tohiti');
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
                            "token": token,
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
                        MatKhau: mk,
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
    console.log(decoded);
    res.send(decoded);

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

module.exports = router;
