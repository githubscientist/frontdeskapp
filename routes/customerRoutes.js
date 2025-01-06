const express = require('express');
const customerController = require('../controllers/customerController');
const auth = require('../middlewares/auth');

const customerRouter = express.Router();

customerRouter.post('/', auth.checkAuth, auth.allowRoles(['manager', 'admin']), customerController.createCustomer);
customerRouter.get('/', auth.checkAuth, auth.allowRoles(['manager', 'admin']), customerController.getCustomers);
customerRouter.get('/:customerId', auth.checkAuth, customerController.getCustomerById);
customerRouter.put('/:customerId', auth.checkAuth, auth.allowRoles(['manager', 'admin']), customerController.updateCustomer);
customerRouter.delete('/:customerId', auth.checkAuth, auth.allowRoles(['admin']), customerController.deleteCustomer);

module.exports = customerRouter;