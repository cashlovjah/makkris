/**
 * Created by cshlovjah on 30.08.16.
 */
var express = require('express');
var router = express.Router();
var event = require('../controllers/menuUI');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();


router.get('/', utilz.isLoggedIn);

router.get('/', event.findMenuUIAll);


module.exports = router;