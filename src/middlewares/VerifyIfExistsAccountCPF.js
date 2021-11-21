
const {validateCpf} = require('../utils/validates');
const customers = require('../database/customers');

exports.verifyIfExistsAccountCpf = (request, response, next) => {
    const { cpf,  } = request.body;

    const custumerAlreadyExists = customers.customers.some(customer => customer.cpf === cpf);

    if(!custumerAlreadyExists){
        return response.status(400).json({error: "Usuário ou Senha Inválidos!"});
    }

    request.custumerAlreadyExists = custumerAlreadyExists;

    return next();
}