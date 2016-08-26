/**
 * Created by cshlovjah on 14.07.16.
 */
var mongoose = require('../libs/mongoose');

var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    group: String,
    boxId: String,
    fio: String,
    description: String,
    status: String,
    picture: String,
    createOwner: String,
    updateOwner: String,
    createDate: String,
    updateDate: String
});


Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);