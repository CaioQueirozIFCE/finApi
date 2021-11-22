const {v4: uuidv4} = require('uuid');
const {hash} = require('bcryptjs');
const customers = require('../../database/customers');
const {convertNumber} = require('../../utils/validates');

exports.accountStore =  async (request, response) => {
    const {cpf, name, password, balance, transactions} = request.body;

    const userAlreadyExists = customers.customers.some(customer => customer.cpf === cpf);

    if(userAlreadyExists){
        return response.status(400).json({error: "Usuário já cadastrado!"});
    }

    const passwordWithHash = await hash(password, 8);

    if(typeof(balance) === String || balance === null){
        throw new Error('Saldo inválido');
    }   

    const user = {
        cpf, 
        name,
        id: uuidv4(),
        transactions,
        balance,
        password: passwordWithHash,
    }

    customers.customers.push(user);

    return response.status(201).json({
        message: "Usuário criado com sucesso!",
        "user": {
            cpf: user.cpf, 
            name: user.name,
            id: user.id,
            balance: convertNumber(balance),
            transactions: user.transactions
        }
    });    
}

exports.getAccounts = async (request, response) => {
    return response.status(200).json({data: customers.customers});
}