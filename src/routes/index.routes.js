const { Router } = require('express');
const {verifyIfExistsAccountCpf} = require('../middlewares/VerifyIfExistsAccountCPF');
const {validateCPFMiddleware} = require('../middlewares/ValidateCPFMiddleware');
const accountRoutes = require('./account/account.routes');
const statementRoutes = require('./statement/statement.routes');

const router = new Router();


router.use(validateCPFMiddleware);
router.use('/account', accountRoutes);
router.use('/list-statament', verifyIfExistsAccountCpf, statementRoutes);

module.exports = router;