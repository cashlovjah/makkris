
var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');
var Utilz = require('../libs/Utilz')
var utilz = new Utilz();

router.get('/', function(req, res) {
    res.render('register', {user: req.user, title: "Регистрация"});
});

router.post('/', function(req, res) {
    Account.register(new Account({ 
        username : req.body.username,
        group : "administrators",
        boxId: "ff", fio: "admin admin admin",
        status: "on",
        description: "User administrator",
        createDate: utilz.nowDate()}),
        req.body.password, function(err, account) {
        if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."})
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

module.exports = router;