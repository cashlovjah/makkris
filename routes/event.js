var express = require('express');
var router = express.Router();
var event = require('../controllers/event');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();


router.get('/', utilz.isLoggedIn);

router.get('/', event.findEventAll);
router.get('/:id', event.findEventById);
router.post('/', event.addEvent);
router.put('/:id', event.updateEvent);
router.delete('/:id', event.deleteEvent);

module.exports = router;