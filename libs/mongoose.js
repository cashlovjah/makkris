/**
 * Created by cshlovjah on 14.07.16.
 */
var mongoose    = require('mongoose');
var log         = require('./log')(module);
var config      = require('./config');
mongoose.connect(config.get('mongoose:uri'));


mongoose.connection;

module.exports = mongoose;