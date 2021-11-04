const { Router } = require('express');
const {resolve} = require('../../adapters/errorAdapter');

const {accountController} = require('../../controller/accountController');

const accountRoute = new Router();

accountRoute.post('/', resolve(accountController));

module.exports = accountRoute;
