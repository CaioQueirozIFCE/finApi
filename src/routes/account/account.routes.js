const { Router } = require('express');
const {resolve} = require('../../adapters/errorAdapter');

const {accountStore, getAccounts} = require('../../controller/accountController');

const accountRoute = new Router();

accountRoute.post('/', resolve(accountStore));
accountRoute.get('/', resolve(getAccounts));

module.exports = accountRoute;
