var express = require('express');
var router = express.Router();
var HoaDon = require('../Models/HoaDon');
var db = require('../Dbconnection');

router.post('/a?',function(req,res,next)
{
    var qr = 'INSERT INTO hoadon (SoXuSuDung) Values (?)';
    db.query(qr,[req.body.NgayLapHoaDon], function(err, result)
    {
        if (err) {
               console.log("error ocurred",err);
            res.send
            ({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
               console.log('The solution is: ', result);
            res.send({
                'inserted_id': result.insertID,
            });
        }
    });
});

router.get('/:id?',function(req,res,next)
{
    if(req.params.id){
        HoaDon.getHoaDonById(req.params.id,function(err,rows){
            if(err){
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }else{
        HoaDon.getAllHoaDon(function(err,rows){
            if(err){
                res.json(err);
            } else {
                res.json(rows);
            }

        });
    }
});

module.exports = router;
