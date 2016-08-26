
var express = require('express');
var router = express.Router();
var customer = require('../controllers/customer');
var Utilz = require('../libs/Utilz');
var utilz = new Utilz();

router.get('/', utilz.isLoggedIn);
router.get('/', customer.findCustomerAll);
router.get('/:id', customer.findCustomerById);
router.post('/', customer.addCustomer);
router.put('/:id', customer.updateCustomer);
router.delete('/:id', customer.deleteCustomer);

module.exports = router;