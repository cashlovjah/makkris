
var express = require('express');
var router = express.Router();
var resources = require('../controllers/resources');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();


router.get('/', utilz.isLoggedIn);
router.get('/', resources.findResourcesAll);

//Box section
router.get('/box', resources.findBoxResourcesAll);
router.get('/box/:bid', resources.findBoxResourcesById);
router.post('/box', resources.addBoxResources);
router.put('/box/:bid', resources.updateBoxResources);
router.delete('/box/:bid', resources.deleteBoxResources);

//Post section
router.get('/box/:bid/post', resources.findPostResourcesAll);
router.get('/box/:bid/post/:pid', resources.findPostResourcesById);
router.post('/box/:bid/post', resources.addPostResources);
router.put('/box/:bid/post/:pid', resources.updatePostResources);
router.delete('/box/:bid/post/:pid', resources.deletePostResources);

module.exports = router;