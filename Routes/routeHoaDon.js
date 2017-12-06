var express = require('express');
var router = express.Router();
var HoaDon = require('../Models/HoaDon');
var db = require('../Dbconnection');



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
