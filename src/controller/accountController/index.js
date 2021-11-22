const {v4: uuidv4} = require('uuid');
const {hash, compareSync} = require('bcryptjs');
const customers = require('../../database/customers');
const {convertNumber} = require('../../utils/validates');

exports.accountStore =  async (request, response) => {
    const {cpf, name, password, balance, transactions} = request.body;

    const userAlreadyExists = customers.customers.some(customer => customer.cpf === cpf);

    if(userAlreadyExists){
        return response.status(400).json({error: "Usuário já cadastrado!"});
    }

    const passwordWithHash = await hash(password, 8);

    if(typeof balance === 'string' || balance === null){
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
    return response.status(200).json({data: customers.customers.map(customer => {
        return {
            ...customer,
            balance: convertNumber(customer.balance)
        }
    })});
}

exports.getAccount = async (request, response) => {
    const { cpf } = request.params;

    const user = customers.customers.find(customer => customer.cpf === cpf);
    
    if(!user){
        return response.status(401).json({ error: 'Usuário não localizado!'});
    }

    return response.status(200).json({data: {
        cpf: user.cpf,
        name: user.name,
        id: user.id,
        balance: user.balance,
        transactions: user.transactions,
    }});
}

exports.updateDataCliente = async (request, response) => {
    const { name, password } = request.body;
    const user = request.userAlreadyExists;

    user.name = name;

    const passwordForChange = compareSync(password, user.password);
    if(password !== passwordForChange){
        user.password = await hash(password, 8);
    }
    
    customers.customers[customers.customers.indexOf(user)] = user;
    return response.status(201).json({
        message: "Usuário alterado com sucesso!",
        "user": {
            cpf: user.cpf, 
            name: user.name,
            id: user.id,
            balance: convertNumber(user.balance),
            transactions: user.transactions
        }
    }); 
}

exports.deleteUser = async (request, response) => {
    const { cpf } = request.body;

    const user = customers.customers.find(customer => customer.cpf === cpf);
    
    if(!user){
        return response.status(401).json({ error: 'Usuário não localizado!'});
    }

    const index = customers.customers.indexOf(user);
    customers.customers.splice(index, 1);
    
    return response.status(204).json({});

}