const { Router } = require('express');
const {resolve} = require('../../adapters/errorAdapter');
const {validateCPFMiddleware} = require('../../middlewares/ValidateCPFMiddleware');
const {verifyIfExistsAccountCpf} = require('../../middlewares/VerifyIfExistsAccountCPF');



const {accountStore, getAccounts, updateDataCliente, deleteUser, getAccount} = require('../../controller/accountController');

const accountRoute = new Router();

accountRoute.post('/', validateCPFMiddleware, resolve(accountStore));
accountRoute.put('/', validateCPFMiddleware, verifyIfExistsAccountCpf, resolve(updateDataCliente));
accountRoute.delete('/', validateCPFMiddleware, resolve(deleteUser));
accountRoute.get('/', resolve(getAccounts));
accountRoute.get('/:cpf', resolve(getAccount));

module.exports = accountRoute;
