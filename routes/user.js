
var express = require('express');
var router = express.Router();
var user = require('../controllers/user');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();


router.get('/', utilz.isLoggedIn);
router.get('/', user.findUserAll);
router.get('/:id', user.findUserById);
router.post('/', user.addUser);
router.put('/:id', user.updateUser);
router.patch('/:id', user.updateOnePropertyUser);
router.delete('/:id', utilz.god);
router.delete('/:id', user.deleteUser);

module.exports = router;