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

router.post('/dangky',function(req,res,next)
{
    var md5 = crypto.createHash('md5').update(req.body.MatKhau).digest("hex");
    var query = "INSERT INTO khachhang (HoTenKhachHang,Email,MatKhau,TienNo,LoaiKhachHang,SoXuTichLuy) Values (?,?,?,0,0,0)";
    
    var token = jwt.sign(req.body, 'tohiti');
    db.query(query,[req.body.HoTenKhachHang,req.body.Email,md5], function (error, results, fields) {
        if (error) {
        //   console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
        //   console.log('The solution is: ', results);
          res.send({
            "code":200,
            "success":"user registered sucessfully",
            "token": token,
              });
        }
        });
});
function Login(email,mk,res)
{
    var md5 = crypto.createHash('md5').update(mk).digest("hex");
    db.query('SELECT * FROM khachhang WHERE Email = ?',[email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        if(results[0].MatKhau == md5)
        {
            var user = {
                MaKhachHang:results[0].MaKhachHang,
                HoTenKhachHang: results[0].HoTenKhachHang,
                Email: results[0].Email,
                MatKhau: mk,
            }
            var token = jwt.sign(user, 'tohiti');

          res.send({
            "code":200,
            "message":"Login sucessfull",
              "token": token,
              });
        }
        else
            {
          res.send({
            "code":204,
            "message":"Email and password does not match"
              });
        }
      }
      else{
        res.send({
          "code":204,
          "message":"Email does not exists"
            });
      }
    }
    });
}
router.post('/dangnhap?',function(req,res,next)
{
    Login(req.body.Email, req.body.MatKhau, res);
});

router.post('/token?',function(req,res,next)
{
     var token = req.headers.authorization;
     var decoded = jwt.verify(token, 'tohiti');
     console.log(decoded);

});


router.get('/hd/:MaKhachHang?',function(req,res,next){
    KhachHang.getHoaDonByMaKhachHang(req.params.MaKhachHang,function(err,rows){
        if(err){
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});


router.get('/:id?',function(req,res,next)
{
    if(req.params.id){
        KhachHang.getKhachHangById(req.params.id,function(err,rows){
            if(err){
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }else{
        KhachHang.getAllKhachHang(function(err,rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});

module.exports = router;
