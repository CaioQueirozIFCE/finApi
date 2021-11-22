const { Router } = require('express');
const {resolve} = require('../../adapters/errorAdapter');
const {validateCPFMiddleware} = require('../../middlewares/ValidateCPFMiddleware');


const {accountStore, getAccounts} = require('../../controller/accountController');

const accountRoute = new Router();

accountRoute.post('/', validateCPFMiddleware, resolve(accountStore));
accountRoute.get('/', resolve(getAccounts));

module.exports = accountRoute;
