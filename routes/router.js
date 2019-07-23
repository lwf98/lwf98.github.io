let router = require('express').Router();
let Url = require('url');
let DB = require('./../datas/DB');

router.get('/', function (req, res) {
    let db = new DB('user');


    res.render('index.html');
});

module.exports = router;