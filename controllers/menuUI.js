/**
 * Created by cshlovjah on 30.08.16.
 */
var db = require('../libs/mongodriver');
var log = require('../libs/log')(module);
var ObjectID = require('mongodb').ObjectID;
var _ = require('underscore');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();

exports.findMenuUIAll = function (req, res) {
    log.info('Retrieving All items menu\'s:');
    var menuItems = [
        {
            nameItem: "Пользователи",
            classItem: "user-control",
            hrefItem: "users"
        }, {
            nameItem: "Ремонтные-боксы",
            classItem: "boxes-control",
            hrefItem: "boxes"
        }, {
            nameItem: "Ремонтные-посты",
            classItem: "posts-control",
            hrefItem: "posts"
        }, {
            nameItem: "Типы работ",
            classItem: "typeOfWork-control",
            hrefItem: "typeOfWork"
        }, {
            nameItem: "Клиенты",
            classItem: "customer-control",
            hrefItem: "customers"
        }, {
            nameItem: "Журнал",
            classItem: "log-control",
            hrefItem: "log"
        }

    ];
    res.json(menuItems);
};
