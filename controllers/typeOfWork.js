var db = require('../libs/mongodriver');
var log = require('../libs/log')(module);
var ObjectID = require('mongodb').ObjectID;
var _ = require('underscore');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();

exports.findTypeOfWorkAll = function (req, res) {
    log.info('Retrieving All typeOfWork\'s:');
    var collection = db.get().collection('typeOfWork');
    collection.find().toArray(function (err, items) {
        if (err) {
            log.info(err);
        }
        res.json(items);
    });
}

exports.findTypeOfWorkById = function (req, res) {
    var id = req.params.id;
    log.info('Retrieving typeOfWork by id: ' + id);
    var collection = db.get().collection('typeOfWork');

        collection.find({'_id': new ObjectID(id)}).toArray(function (err, item) {
            if (err) {
                log.info(err);
            }
            res.json(item)
        });
}

exports.addTypeOfWork = function (req, res) {
    var typeOfWork = req.body;
    log.info('Adding resources new typeOfWork');
    var createOwner = typeOfWork.createOwner;
    typeOfWork.createOwner = '';
    typeOfWork.createOwner = new ObjectID(createOwner);
    typeOfWork.createDate = utilz.nowDate();

    var collection = db.get().collection('typeOfWork');
        collection.insert(typeOfWork, function (err, result) {
            if (err) {
                log.info(err);
            }
            log.info(JSON.stringify(result.result));
            res.json(result.result);
        });
}

exports.updateTypeOfWork = function (req, res) {
    var id = req.params.id;
    var typeOfWork = req.body;
    console.log('Updating typeOfWork: ' + id);
    console.log('\n');

    var typeOfWork = {};
  
    typeOfWork.updateDate = utilz.nowDate();

    log.info("Клиент: " + JSON.stringify(typeOfWork));
    var idString = new ObjectID(id);

    var collection = db.get().collection('typeOfWork');
        collection.update({'_id': idString}, {
            $set: typeOfWork
        }, function (err, result) {
            if (err) {
                log.info(err);
                log.info(result);
                res.json(err);
            } else {
                res.json(result);
            }
        });
}

exports.deleteTypeOfWork = function (req, res) {
    var id = req.params.id;
    console.log('Deleting typeOfWork: ' + id);
    var collection = db.get().collection('typeOfWork');
         collection.remove({'_id': new ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.json(result);
            }
        });
}

