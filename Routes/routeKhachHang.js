var express = require('express');
var router = express.Router();
var KhachHang = require('../Models/KhachHang');
var crypto = require('crypto');
var db = require('../Dbconnection');
var jwt = require('jsonwebtoken');

router.post('/token?',function(req,res,next)
{
    var token = req.body.token;
    var decoded = jwt.verify(token, 'tohiti');
    console.log(decoded);
    Login(decoded.Email, decoded.MatKhau, res);
});

router.post('/dangky',function(req,res,next)
{
    var md5 = crypto.createHash('md5').update(req.body.MatKhau).digest("hex");
    var qr = "INSERT INTO KhachHang (HoTenKhachHang,Email,MatKhau,TienNo,LoaiKhachHang,SoXuTichLuy) Values (?,?,?,0,0,0)";
    
    var token = jwt.sign(req.body, 'tohiti');
    db.query(qr,[req.body.HoTenKhachHang,req.body.Email,md5], function (error, results, fields) {
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
function Login(email,mk, res)
{
    var md5 = crypto.createHash('md5').update(mk).digest("hex");
    db.query('SELECT * FROM KhachHang WHERE Email = ?',[email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
          console.log("md5:    "+ md5);
          console.log(results[0].MatKhau);
        if(results[0].MatKhau == md5){
          res.send({
            "code":200,
            "success":"login sucessfull"
              });
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
              });
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
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
    var token = req.body.token;
    var decoded = jwt.verify(token, 'tohiti');
    console.log(decoded);
    Login(decoded.Email, decoded.MatKhau, res);
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