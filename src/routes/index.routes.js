const { Router } = require('express');

const accountRoutes = require('./account/account.routes');

const router = new Router();

router.use('/account', accountRoutes);

module.exports = router;