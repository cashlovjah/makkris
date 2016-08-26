var db = require('../libs/mongodriver');

exports.findTestAll = function ( req, res ){
   var collection = db.get().collection('customer');
    collection.find().toArray(function(err, docs){
        console.log(docs);
        console.log(JSON.stringify(req.body));
        res.json(req.body);
    })
   
};