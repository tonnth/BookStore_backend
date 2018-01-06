var express = require('express');
var router = express.Router();
var Sach = require('../Models/Sach');
var db = require('../Dbconnection');

router.get('/moi?',function(req,res,next){
    Sach.getSachMoi(function(err,rows){
        if(err){
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/khuyenmai?',function(req,res,next){
    Sach.getSachKhuyenMai(function(err,rows){
        if(err){
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/theloai/:MaTheLoai?',function(req,res,next){
    Sach.getSachByTheLoai(req.params.MaTheLoai,function(err,rows){
        if(err){
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/banner?',function(req,res,next){
    var result;
    db.query('select * from banner inner join sach on sach.MaSach=banner.MaSach',function (err,rows)
    {
        if(err) res.json(err);
        else res.json(rows);
    })
});



router.get('/:id?',function(req,res,next){
    if(req.params.id){
        Sach.getSachById(req.params.id,function(err,rows){
            if(err){
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }else{
        Sach.getAllSach(function(err,rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});

module.exports = router;
