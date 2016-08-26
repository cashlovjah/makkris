/**
 * Created by cshlovjah on 15.07.16.
 */
var moment = require('moment');
//Вспомогательные утилиты
function Utilz() {
};

//Генерация пятизначного кода
Utilz.prototype.chargen = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

//Выдрать цифровое значение из id (пять букв а далее цифры)
Utilz.prototype.extractNumber = function (numid) {
    var reg = /\d/g;
    var num = String(numid).match(reg);
    return num;
};

//Выдрать цифровое значение из id (пять букв а далее цифры)
Utilz.prototype.extractChars = function (numid) {
    var reg = numid.replace(/[0-9]/g, '');
    if (reg.length == 5) {
        return reg;
    } else {
        return "error";
    }

};

//Максимальное число в массиве
Utilz.prototype.maxNumber = function (array) {
    return Math.max.apply(null, array);
};

Utilz.prototype.nowDate = function () {
    var currentDate = moment().format().split('+');
    return currentDate[0];
};

Utilz.prototype.isLoggedIn = function (req, res, next) {
        if (!req.user) {
            res.render('login', {user: req.user, title: "Авторизуйтесь"});
        } else {
            if (req.user.status == 'true') {
                console.log("Тада!")
                return next();
            } else {
                //return next()
                console.log("Пользователь: "+req.user.username+" отключен!");
                res.render('login', {user: req.user, title: "Авторизуйтесь"});
            }
        }
    };

Utilz.prototype.god = function (req, res, next) {
            if(req.params.id == '57878b994230774e3167f6e1'){
                console.log('Is God!');
                res.render('index', {user: req.user, title: "Панель управления"});
            }else{
                console.log(": "+req.params.id)
                console.log("All right!");
                return next();
            }
 
};

module.exports = Utilz;