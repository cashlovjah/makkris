/**
 * Created by cshlovjah on 19.07.16.
 */
var db = require('../libs/mongodriver');
var _ = require('underscore');
var log = require('../libs/log')(module);
var ObjectID = require('mongodb').ObjectID;
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();

exports.findCustomerAll = function (req, res) {
    log.info('Retrieving All Customer\'s:');
    var collection = db.get().collection('customer');
        collection.find().toArray(function (err, items) {
            if (err) {
                log.info(err);
            }
            res.json(items);
        });

}


exports.findCustomerById = function (req, res) {
    var cid = req.params.cid;
    log.info('Retrieving Customer by id: ' + cid);
    var collection = db.get().collection('customer');
   
        collection.find({'_id': new ObjectID(cid)}).toArray(function (err, item) {
            if (err) {
                log.info(err);
            }
            res.json(item)
        });
}

exports.addCustomer = function (req, res) {
    var customer = req.body;
    log.info('Adding resources new box');
    var createOwner = customer.createOwner;
    customer.createOwner = '';
    customer.createOwner = new ObjectID(createOwner);
    customer.createDate = utilz.nowDate();
    
    var collection = db.get().collection('customer');
        collection.insert(customer, function (err, result) {
            if (err) {
                log.info(err);
            }
            log.info(JSON.stringify(result.result));
            res.json(result.result);
        });
}


exports.updateCustomer = function (req, res) {
    var cid = req.params.cid;
    var customer = req.body;
    console.log('Updating customer: ' + cid);
    console.log('\n');

    var customer = {};
    if (req.body.name != undefined) {
        customer.name = req.body.name
    }
    if (req.body.phone != undefined) {
        customer.phone = req.body.phone
    }
    if (req.body.vin != undefined) {
        customer.vin = req.body.vin
    }
    if (req.body.vin != undefined) {
        customer.vin = req.body.vin
    }
    if (req.body.DriverLicenseNumber != undefined) {
        customer.DriverLicenseNumber = req.body.DriverLicenseNumber
    }
    if (req.body.Mileage != undefined) {
        customer.Mileage = req.body.Mileage
    }
    if (req.body.createOwner != undefined) {
        customer.createOwner = req.body.createOwner
    }
    if (req.body.createDate != undefined) {
        customer.createDate = req.body.createDate
    }
    customer.updateDate = utilz.nowDate();

    log.info("Клиент: " + JSON.stringify(customer));
    var idString = new ObjectID(cid);

    var collection = db.get().collection('customer');
        collection.update({'_id': idString}, {
            $set: customer
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


exports.deleteCustomer = function (req, res) {
    var cid = req.params.cid;
    console.log('Deleting box: ' + cid);
    var collection = db.get().collection('customer');
         collection.remove({'_id': new ObjectID(cid)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.json(result);
            }
        });
}

