/**
 * Created by cshlovjah on 15.07.16.
 */
var db = require('../libs/mongodriver');
var _ = require('underscore');
var log = require('../libs/log')(module);
var ObjectID = require('mongodb').ObjectID;
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();

//Все ресурсы
exports.findResourcesAll = function (req, res) {
    log.info('Retrieving All Resource\'s:');
    var collection = db.get().collection('resources');
    collection.find().toArray(function (err, items) {
        res.send(items);
    });
};

/* Box section*/

//Все ремонтные боксы
exports.findBoxResourcesAll = function (req, res) {
    log.info('Retrieving All Boxe\'s:');
    var collection = db.get().collection('resources');
    collection.find({}, {
        "id": true,
        "title": true,
        "description": true,
        "eventColor": true,
        "createDate": true,
        "updateDate": true
    }).toArray(function (err, items) {
        res.send(items);
    });
};

//Поиск ремонтного бокса по id
exports.findBoxResourcesById = function (req, res) {
    var bid = req.params.bid;
    log.info('Retrieving box: ' + bid);
    var collection = db.get().collection('resources');
        collection.findOne({'_id': new ObjectID(bid)}, function (err, item) {
            if (err) {
                log.info(err);
                res.json({"status": "not found"})
            } else {
                if (item != undefined) {
                    res.json(item);
                } else {
                    res.json({"status": "not found"})
                }
            }
        });
};

//Добавление ремонтного бокса
exports.addBoxResources = function (req, res) {
    var box = req.body;
    log.info('Adding resources box: ' + JSON.stringify(box));
    // res.json(box);
    var collection = db.get().collection('resources');
        collection.find({}, {
            "id": true
        }).toArray(function (err, items) {
            //возможные варианты id ремонтных боксов
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            //используемые в данный момент id
            var existId = [];
            //свободные id для использования
            var freeId = [];
            //заполняем existId данными из базы с используемыми id
            _.each(items, function (existElId) {
                existId.push(existElId.id);
            });
            //формируем возможные для использования id ремонтных боксов
            freeId = _.difference(abc, existId);

            //берем первый из массива, используем 
            var id = _.first(freeId);
            if (id != undefined) {

                collection.insert({
                    'id': id,
                    'title': req.body.title,
                    'description': req.body.description,
                    'eventColor': req.body.eventColor,
                    'createDate': utilz.nowDate(),
                    'children': ''
                }, function (err, result) {
                    if (err) {
                        log.info(err);
                    }
                    res.json(result);
                });
            } else {
                res.json({"status": "not found"})
            }
        });
}

//Обновление ремонтного бокса
exports.updateBoxResources = function (req, res) {
    var bid = req.params.bid;
    var box = req.body;
    console.log('Updating box: ' + bid);
    console.log('\n');

    var box = {};
    if (req.body.title != undefined) {
        box.title = req.body.title
    }
    if (req.body.eventColor != undefined) {
        box.eventColor = req.body.eventColor
    }
    if (req.body.description != undefined) {
        box.description = req.body.description
    }
    box.updateDate = utilz.nowDate()
    var idString = new ObjectID(req.params.bid);

    var collection = db.get().collection('resources');
        collection.update({_id: idString}, {
            $set: box
        }, function (err, result) {
            if (err) {
                log.info(err);
                res.json(err);
            } else {
                res.json(result);
            }
        });
}

//Удаление ремонтного бокса
exports.deleteBoxResources = function (req, res) {
    var bid = req.params.bid;
    console.log('Deleting box: ' + bid);
    var collection = db.get().collection('resources');
        collection.remove({'_id': new ObjectID(bid)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.json(result);
            }
        });
}

/* Post section*/

//Поиск всех ремонтных постов для определенного бокса
exports.findPostResourcesAll = function (req, res) {
    log.info(JSON.stringify(req.params));
    var bid = req.params.bid;
    log.info('Retrieving post: ' + bid);
    var collection = db.get().collection('resources');
        collection.findOne({'_id': new ObjectID(bid)}, function (err, item) {
            if (err) {
                res.json({"status": "not found"})
            } else {
                if (item != undefined) {
                    res.json(item.children);
                } else {
                    res.json({"status": "not found"})
                }
            }
        });

}

//Поиск ремонтного поста по id
exports.findPostResourcesById = function (req, res) {
    log.info(JSON.stringify(req.params));
    var bid = req.params.bid;
    var pid = req.params.pid;
    var collection = db.get().collection('resources');
        collection.findOne({'_id': new ObjectID(bid)}, function (err, item) {
            if (err) {
                res.json({"status": "not found"})
            } else {
                if (item != undefined) {
                    if (item.children != '') {
                        var post = {};
                        _.each(item.children, function (child) {
                            if (child.id == pid) {
                                post = child;
                            } else {
                                post.status = "post not found";
                            }
                        });
                        res.json(post);
                    } else {
                        res.json({"status": "post not found"})
                    }
                } else {
                    res.json({"status": "box not found"})
                }
            }
        });
}

//Добовление ремонтного поста
exports.addPostResources = function (req, res) {
    log.info(JSON.stringify(req.params));
    var bid = req.params.bid;
    log.info('Adding resources post: ' + bid);
    var collection = db.get().collection('resources');
        collection.findOne({'_id': new ObjectID(bid)}, function (err, item) {

            if (item.children.length == 0) {
                log.info("Create first item")
                var child = {};
                var pid = item.id + 1;

                child.id = pid;
                child.title = req.body.title;
                child.description = req.body.description;
                child.createDate = utilz.nowDate();
                //Add post 
                collection.update({'_id': new ObjectID(bid)}, {
                    $push: {
                        children: child
                    }
                }, function (err, result) {
                    if (err) {
                        log.info("Error");
                    } else {
                        res.json(result);
                    }
                });

            } else {
                var childIdArray = [];
                _.each(item.children, function (child) {
                    childIdArray.push(utilz.extractNumber(child.id))
                });
                var id = utilz.maxNumber(childIdArray);
                id = Number(id) + 1;
                var child = {};

                var pid = item.id + id;

                child.id = pid;
                child.title = req.body.title;
                child.description = req.body.description;
                child.createDate = utilz.nowDate();

                collection.update({'_id': new ObjectID(bid)}, {
                    $push: {
                        children: child
                    }
                }, function (err, result) {
                    if (err) {
                        log.info("Error");
                    } else {
                        log.info("RESULT: " + result)
                        res.json(result);
                    }
                });
            }
        });
}

//Обновление ремонтного поста
exports.updatePostResources = function (req, res) {
    var bid = req.params.bid;
    var pid = req.params.pid;
    //var post = req.body;
    console.log('Updating post: ' + pid);
    console.log('\n');

    var post = {};

    post.id = pid;
    if (req.body.title != undefined) {
        post.title = req.body.title
    }

    if (req.body.description != undefined) {
        post.description = req.body.description
    }

    post.updateDate = utilz.nowDate();
    var idString = new ObjectID(bid);
    console.log(post);
    var collection = db.get().collection('resources');
        collection.updateOne({'_id': idString, 'children.id': pid},
            {
                $set: {
                    "children.$.title": post.title,
                    "children.$.description": post.description,
                    "children.$.updateDate": post.updateDate
                }
            }, function (err, result) {
                if (err) {
                    log.info();
                }
                res.json(result);
            });
}

exports.deletePostResources = function (req, res) {
    var bid = req.params.bid;
    var pid = req.params.pid;
    //var post = req.body;
    console.log('Deleting post: ' + pid);
    console.log('\n');
    var collection = db.get().collection('resources');
        collection.updateOne({'_id': new ObjectID(bid)},
            {
                $pull: {'children': {id: pid}}
            }, {safe: true}, function (err, result) {
                if (err) {
                    log.info(err);
                }
                res.json(result);
            });

}