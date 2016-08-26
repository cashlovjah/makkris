var express = require('express');
var router = express.Router();
var typeOfWork = require('../controllers/typeOfWork');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();


router.get('/', utilz.isLoggedIn);

router.get('/', typeOfWork.findTypeOfWorkAll);
router.get('/:id', typeOfWork.findTypeOfWorkById);
router.post('/', typeOfWork.addTypeOfWork);
router.put('/:id', typeOfWork.updateTypeOfWork);
router.delete('/:id', typeOfWork.deleteTypeOfWork);

module.exports = router;