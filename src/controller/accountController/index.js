const {validateCpf} = require('../../utils/validates');
const {v4: uuidv4} = require('uuid');
const {hash} = require('bcryptjs');
const customers = require('../../database/customers');

exports.accountController =  async (request, response) => {
    const {cpf, name, password, statement} = request.body;

    if(!validateCpf(cpf)){
        return response.status(400).json({error: "CPF Inválido!"});
    }

    const custumerAlreadyExists = customers.customers.some(customer => customer.cpf === cpf);

    if(custumerAlreadyExists){
        return response.status(400).json({error: "Usuário já cadastrado no sistema!"});
    }

    const passwordWithHash = await hash(password, 8);
        console.log('request', passwordWithHash)

    const user = {
        cpf, 
        name,
        id: uuidv4(),
        statement,
        password: passwordWithHash,
    }

    customers.customers.push(user);

    return response.status(201).json({
        message: "Usuário criado com sucesso!",
        "user": {
            cpf: user.cpf, 
            name: user.name,
            id: user.id,
            statement: user.statement
        }
    });    
}