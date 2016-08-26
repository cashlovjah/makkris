/**
 * Created by cshlovjah on 14.07.16.
 */
var fs    = require('fs');
var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: './config.json' });

module.exports = nconf;