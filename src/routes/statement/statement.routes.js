const { Router } = require('express');

const {resolve} = require('../../adapters/errorAdapter');

const {getStatement} = require('../../controller/statementController');

const accountRoute = new Router();

accountRoute.post('/', resolve(getStatement));

module.exports = accountRoute;
