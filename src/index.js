const express = require('express');
const {validateCpf} = require('./utils/validates');
const {v4: uuidv4} = require('uuid');
const {hash} = require('bcryptjs');

const {ExceptionHandlerGlobal} = require('./middlewares/ErrorsMiddlewares');

const app = express();

app.use(express.json());

const customers = [];

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */
app.post('/account', async (request, response) => {
    const {cpf, name, password, statement} = request.body;

    if(!validateCpf(cpf)){
        return response.status(400).json({error: "CPF Inválido!"});
    }

    const custumerAlreadyExists = customers.some(customer => customer.cpf === cpf);

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

    customers.push(user);

    delete user.password;

    return response.status(201).json({
        message: "Usuário criado com sucesso!",
        "user": user
    });
});


app.use(ExceptionHandlerGlobal);

app.listen(3333, () => console.log('Server is Running!!!!'));