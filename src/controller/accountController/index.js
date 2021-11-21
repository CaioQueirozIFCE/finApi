const {validateCpf} = require('../../utils/validates');
const {v4: uuidv4} = require('uuid');
const {hash} = require('bcryptjs');
const customers = require('../../database/customers');

exports.accountStore =  async (request, response) => {
    const {cpf, name, password, statement} = request.body;

    const passwordWithHash = await hash(password, 8);

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

exports.getAccounts = async (request, response) => {
    return response.status(200).json({data: customers.customers});
}