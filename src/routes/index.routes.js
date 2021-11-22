const { Router } = require('express');
const {verifyIfExistsAccountCpf} = require('../middlewares/VerifyIfExistsAccountCPF');
const {validateCPFMiddleware} = require('../middlewares/ValidateCPFMiddleware');
const accountRoutes = require('./account/account.routes');
const transactionRoutes = require('./transactions/index.routes');

const router = new Router();

router.use('/account', accountRoutes);
router.use('/transaction', validateCPFMiddleware, verifyIfExistsAccountCpf, transactionRoutes);

module.exports = router;