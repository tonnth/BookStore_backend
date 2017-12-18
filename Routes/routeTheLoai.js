var express = require('express');
var router = express.Router();
var HoaDon = require('../Models/TheLoai');
var db = require('../Dbconnection');



router.get('/?',function(req,res,next)
{

        HoaDon.getAllTheLoai(function(err,rows){
            if(err){
                res.json(err);
            } else {
                rows.forEach((element) => {
                    console.log(element);
            });
                res.json(rows);
            }

        });

});

module.exports = router;
