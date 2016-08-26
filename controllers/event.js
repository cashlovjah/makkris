var db = require('../libs/mongodriver');
var log = require('../libs/log')(module);
var ObjectID = require('mongodb').ObjectID;
var _ = require('underscore');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();

exports.findEventAll = function (req, res) {
 /* Убрать авторизцация
    if(!req.user){
        res.redirect('/login');
    }else{
   */     
        log.info("Current user: "+req.user._id);
        log.info('Retrieving All event\'s:');
        var collection = db.get().collection('event');
        collection.find().toArray(function (err, items) {
            if (err) {
                log.info(err);
            }
            res.json(items);
        });
    // удбрать авторизация}
  
    
   
}

exports.findEventById = function (req, res) {
    var id = req.params.id;
    log.info('Retrieving event by id: ' + id);
    var collection = db.get().collection('event');

        collection.find({'_id': new ObjectID(id)}).toArray(function (err, item) {
            if (err) {
                log.info(err);
            }
            res.json(item)
        });
}

exports.addEvent = function (req, res) {
    var event = req.body;
    log.info('Adding resources new event');
   
    if(req.user != undefined){
        log.info("Current user: "+req.user._id);
    }
    var createOwner = event.createOwner;
    event.createOwner = '';
    event.createDate = utilz.nowDate();

   // event.createOwner = new ObjectID(createOwner);


    var collection = db.get().collection('event');
        collection.insert(event, function (err, result) {
            if (err) {
                log.info(err);
            }
            log.info(JSON.stringify(result.result));
            res.json(result.result);
        });
}

exports.updateEvent = function (req, res) {
    var id = req.params.id;
    var event = req.body;
    console.log('Updating event: ' + id);
    console.log('\n');

    var event = {};
    if (req.body.name != undefined) {
        customer.name = req.body.name
    }


    event.updateDate = utilz.nowDate();

    log.info("Клиент: " + JSON.stringify(event));
    var idString = new ObjectID(id);

    var collection = db.get().collection('event');
        collection.update({'_id': idString}, {
            $set: event
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

exports.deleteEvent = function (req, res) {
    var id = req.params.id;
    console.log('Deleting event: ' + id);
    var collection = db.get().collection('event');
         collection.remove({'_id': new ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.json(result);
            }
        });
}

