var express = require('express');
var router = express.Router();
var fs = require('fs');

var moment = require('moment');

/* GET home page. */


router.get('/', function (req, res, next) {
    res.render('main.html');

});


router.post('/getJsonFile', function (req, res, next) {
    console.log(req.body.fileurl);
    fs.readFile(req.body.fileurl,function (err,files) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(files);
        }
    });


});




module.exports = router;
