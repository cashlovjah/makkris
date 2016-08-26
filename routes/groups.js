var express = require('express');
var router = express.Router();
var groups = require('../controllers/groups');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();

router.get('/', utilz.isLoggedIn);
router.get('/', groups.findGroupsAll);
router.get('/:id', groups.findGroupsById);
// router.post('/', groups.addGroups);
// router.put('/:id', groups.updateGroups);
// router.delete('/:id', groups.deleteGroups);

module.exports = router;