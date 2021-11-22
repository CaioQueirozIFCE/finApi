const { Router } = require('express');

const {resolve} = require('../../adapters/errorAdapter');

const {deposits} = require('../../controller/transactionsController/deposits');
const {withDrawals} = require('../../controller/transactionsController/withDrawals');

const transactionRoutes = new Router();

transactionRoutes.post('/deposit', resolve(deposits));
transactionRoutes.post('/with-drawals', resolve(withDrawals));

module.exports = transactionRoutes;