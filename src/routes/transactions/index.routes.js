const { Router } = require('express');

const {resolve} = require('../../adapters/errorAdapter');

const {deposits} = require('../../controller/transactionsController/deposits');

const transactionRoutes = new Router();

transactionRoutes.post('/deposit', resolve(deposits));

module.exports = transactionRoutes;