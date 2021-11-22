
const {compareSync} = require('bcryptjs');
const customers = require('../database/customers');

exports.verifyIfExistsAccountCpf = (request, response, next) => {
    const { cpf,  password} = request.body;

    const user = customers.customers.find(customer => customer.cpf === cpf);

    if(!user){
        return response.status(400).json({error: "Usuário ou Senha Inválidos!"});
    }
    const passwordIsValided = compareSync(password, user.password);
    
    if(!passwordIsValided){
        return response.status(401).json({error: "Usuário ou Senha inválida!"});
    }

    request.userAlreadyExists = user;

    return next();
}