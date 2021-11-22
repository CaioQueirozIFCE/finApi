const { Router } = require('express');

const {resolve} = require('../../adapters/errorAdapter');

const {deposits} = require('../../controller/transactionsController/deposits');
const {withDrawals} = require('../../controller/transactionsController/withDrawals');
const {statement} = require('../../controller/transactionsController/statement');

const transactionRoutes = new Router();

transactionRoutes.post('/deposit', resolve(deposits));
transactionRoutes.post('/with-drawals', resolve(withDrawals));
transactionRoutes.post('/statements', resolve(statement));

module.exports = transactionRoutes;