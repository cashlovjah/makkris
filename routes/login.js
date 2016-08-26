
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res) {

    if (!req.user) {
        var answer = {
            user: req.user,
            loggedIn: false,
            title: "Авторизуйтесь!"
        };

        //res.json(answer)
        res.render('login', {user: req.user, title: "Авторизуйтесь"});

    }
    else {
        if (req.user.status == 'true') {
            var answer = {
                user: req.user,
                loggedIn: true,
                title: "Панель управления"
            };
            res.json(answer)
        } else {
            res.render('login', {user: req.user, title: "Авторизуйтесь"});
        }
    }
});

//
router.post('/', passport.authenticate('local'), function (req, res) {
    console.log("The logged name user: " + req.user.username);

    if (!req.user) {
        res.render('login', {user: req.user, title: "Авторизуйтесь"});
    } else {

       if (req.user.status == 'true') {
            var role;

            req.session.save(function (err) {
                if (err) {
                }
                return;
            });
            role = req.user.role;
            console.log("Статистика пользователя: " + req.user);
            res.redirect('/');
       } else {
            console.log("Пользователь: "+req.user.username+" отключен!")
            res.render('login', {user: req.user, title: "Авторизуйтесь"});
       }
    }
});


module.exports = router;