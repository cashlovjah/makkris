var express = require('express');
var router = express.Router();
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();


router.get('/', utilz.isLoggedIn);


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {user: req.user, title: "Панель управления"});
});
module.exports = router;
