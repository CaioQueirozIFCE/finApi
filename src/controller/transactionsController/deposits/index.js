const customers = require('../../../database/customers');
const {convertNumber}  = require('../../../utils/validates');

exports.deposits = (request, response) => {
    const { transaction } = request.body; 
    const sendingUser = request.userAlreadyExists;

    const recipientUser = customers.customers.find(customer => customer.cpf === transaction.transactionOperationCpf);
    
    if(!recipientUser){
        return response.status(401).json({error: "Cliente que receberá o depósito não foi localizado!"});
    }

    //verificar o saldo do remetente e comparar se o valor destinado é menor que o saldo
    if(+transaction.transactionValue > +sendingUser.balance){
        return response.status(401).json({error: "Saldo insuficiente!"});
    }
    //efetuar a retirada de valores
    const newBalanceSedingUSer = +sendingUser.balance - +transaction.transactionValue;
    
    sendingUser.balance = newBalanceSedingUSer;
    sendingUser.transactions.push(
            {
                date: transaction.date,
                transactionOperationCpf: recipientUser.cpf,
                transactionType:transaction.transactionType,
                transactionValue: transaction.transactionValue,
                description: transaction.description
            }
        );
    
    recipientUser.balance += +transaction.transactionValue;
    recipientUser.transactions.push(
        {
            date: transaction.date,
            transactionOperationCpf: sendingUser.cpf,
            transactionType:transaction.transactionType,
            transactionValue: transaction.transactionValue,
            description: transaction.description
        }
    ) 

    customers.customers[customers.customers.indexOf(sendingUser)] = sendingUser;
    customers.customers[customers.customers.indexOf(recipientUser)] = recipientUser;

    return response.status(201).json({sucess: `Depósito realizado com sucesso. Saldo Atual: R$ ${convertNumber(sendingUser.balance)}`});
    
}
