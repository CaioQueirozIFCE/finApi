const { Router } = require('express');

const accountRoutes = require('./account/account.routes');
const statementRoutes = require('./statement/statement.routes');

const router = new Router();

router.use('/account', accountRoutes);
router.use('/list-statament', statementRoutes);

module.exports = router;