var db = require('../libs/mongodriver');
var log = require('../libs/log')(module);
var ObjectID = require('mongodb').ObjectID;
var _ = require('underscore');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();

exports.findGroupsAll = function (req, res) {
    log.info('Retrieving All groups\'s:');
    var groups = [
        {
            id: "1",
            name: "new",
            title: "Новый"
        }, {
            id: "2",
            name: "administrators",
            title: "Администраторы"
        }, {
            id: "3",
            name: "managers",
            title: "Менеджеры"
        }, {
            id: "4",
            name: "carMechanics",
            title: "Авто-слесаря"
        }
    ];
    res.json(groups);
};

//Поиск ремонтного бокса по id
exports.findGroupsById = function (req, res) {
    var id = req.params.id;
    log.info('Retrieving group: ' + id);
    var groups = [
        {
            id: "1",
            name: "new",
            title: "Новый"
        }, {
            id: "2",
            name: "administrators",
            title: "Администраторы"
        }, {
            id: "3",
            name: "managers",
            title: "Менеджеры"
        }, {
            id: "4",
            name: "carMechanics",
            title: "Авто-слесаря"
        }
    ];

    _.each(groups, function (e){
       if(e.id !== id){
           console.log({ id: e.id, title: e.title, name: e.name});
          
       }else{
           console.log({ id: e.id, title: e.title, name: e.name});
           res.json([{ id: e.id, title: e.title, name: e.name}]);
       }
        }
    );
  
};

