const {convertNumber}  = require('../../../utils/validates');

exports.statement = (request, response) => {
    const { date } = request.body;
    const user = request.userAlreadyExists;
    const statementByDate = user.transactions.filter(transacion => {
        const dateTransaction = new Date(transacion?.date);
        const formatedDate = `${dateTransaction.getFullYear()}-${(dateTransaction.getMonth() + 1) < 10 ? '0' + (dateTransaction.getMonth() + 1) : (dateTransaction.getMonth() + 1)}-${dateTransaction.getDate() < 10 ? '0' + dateTransaction.getDate(): dateTransaction.getDate()}`;
        console.log('formatedDate => ', formatedDate)
        return formatedDate === date;
    })?.map(transaction => {
        return {
            ...transaction,
            transactionValue: convertNumber(transaction.transactionValue)
        }
    });

    if(statementByDate.length <= 0){
        return response.status(201).json({sucess: `Não há movimentações financeiras para o período descrito!`});
    }

    return response.status(201).json({sucess: statementByDate});
}