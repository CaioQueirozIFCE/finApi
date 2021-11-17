const {validateCpf} = require('../../utils/validates');
const customers = require('../../database/customers');
const {compareSync} = require('bcryptjs');

exports.getStatement = async (request, response) => {
    const { cpf, password } = request.body;

    if(!validateCpf(cpf)){
        return response.status(400).json({error: "CPF Inválido!"});
    }

    const user = customers.customers.find(customer => customer.cpf === cpf);

    if(!user){
        return response.status(401).json({error: "Usuário ou Senha inválida!"});
    }
    const passwordIsValided = compareSync(password, user.password);
    
    if(!passwordIsValided){
        return response.status(401).json({error: "Usuário ou Senha inválida!"});
    }

    const statament = user.statement;

    return response.status(200).json({
        message: "Statement retornado com sucesso!",
        "statement": statament
    });


}   