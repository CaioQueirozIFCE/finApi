
const {validateCpf} = require('../utils/validates');


exports.validateCPFMiddleware = (request, response, next) => {
    const { cpf,  } = request.body;

    const { method } = request;
    
    if(method !== 'GET') {
        if(!validateCpf(cpf)){
            return response.status(400).json({error: "CPF Inválido!"});
        }
    }

    return next();
}