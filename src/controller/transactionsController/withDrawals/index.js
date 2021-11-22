const customers = require('../../../database/customers');
const {convertNumber, DateNormalize}  = require('../../../utils/validates');

exports.withDrawals = (request, response) => {
    const { transaction } = request.body;
    const user = request.userAlreadyExists;

    if(+transaction.transactionValue > +user.balance){
        return response.status(401).json({error: "Saldo insuficiente!"});
    }

    user.balance = +user.balance - +transaction.transactionValue;
    user.transactions.push(
        {
            date: DateNormalize(transaction.date),
            transactionOperationCpf: user.cpf,
            transactionType:transaction.transactionType,
            transactionValue: transaction.transactionValue,
        }
    );

    customers.customers[customers.customers.indexOf(user)] = user;

    return response.status(201).json({sucess: `Depósito realizado com sucesso. Saldo Atual: R$ ${convertNumber(user.balance)}`});

}

