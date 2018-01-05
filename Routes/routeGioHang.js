var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../Dbconnection');

router.get('/?', function (req, res, next)
{
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'tohiti');
    db.query('select * from giohang where MaKhachHang=?', [decoded.MaKhachHang], function (err, result)
    {
        if (err)
        {
            res.json(err);
        }
        else
        {
            var giohang = [];
            for(i=0;i < result.length; i++)
            {
                var temp = {
                    MaSach: result[i].MaSach,
                    SoLuongBan: result[i].SoLuongMua,
                    MaKhachHang: result[i].MaKhachHang,
                }
                giohang.push(temp);
            }
            res.json(giohang);
        }
    })

});




router.put('/capnhat', async function (req, res, next)
{
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'tohiti');
    var cart = req.body;
    await db.query('Delete from giohang where MaKhachHang=?', [decoded.MaKhachHang], function (err, rows)
    {
        if (err)
        {
            console.log('Lỗi xóa giỏ hàng cũ');
        }
        else
        {
            for (i = 0; i < cart.length; i++)
            {
                db.query('insert into giohang (MaKhachHang,MaSach,SoLuongMua) values(?,?,?)', [decoded.MaKhachHang, cart[i].MaSach, cart[i].SoLuongBan], function (err2, rows2)
                {
                    if (err)
                    {
                        console.log('Lỗi thêm đơn hàng mới', err2);
                        res.json(err2);
                    }
                })
            }
        }

    });

    res.send({'code':'success'});


    // var backCart= await getGioHang(decoded.MaKhachHang);
    // for(i=0; i < frontCart.length;i++) // với mỗi frontCart
    // {
    //     var add= true;
    //     for(j=0; j < backCart.length; j++) // Với mỗi backCart
    //     {
    //         if(frontCart[i].MaSach === backCart[j].MaSach)
    //         {
    //             //Sách đã có trong giỏ hàng rồi thì update lại số lượng mua
    //             db.query('update giohang set SoLuongMua=? where MaKhachHang=? and MaSach=?', [frontCart[i].SoLuongBan,decoded.MaKhachHang,frontCart[i].MaSach],function (err, rows)
    //             {
    //                 if(err)
    //                 {
    //                     console.log('Lỗi update giỏ hàng', err);
    //                     res.json(err);
    //                 }
    //
    //             })
    //             add = false
    //             break;
    //         }
    //     }
    //
    //     if(add)
    //     {
    //         db.query('insert into giohang (MaKhachHang,MaSach,SoLuongMua) values(?,?,?)', [decoded.MaKhachHang, frontCart[i].MaSach, frontCart[i].SoLuongBan], function (err, rows)
    //         {
    //             if(err)
    //             {
    //                 console.log('Lỗi thêm giỏ hàng', err);
    //                 res.json(err);
    //             }
    //         })
    //     }
    //}
    //res.send({'code':'success'});
});
module.exports = router;