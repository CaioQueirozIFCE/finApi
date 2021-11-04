const AppError = require('../errors/AppError');
// const {} = require('express');

exports.ExceptionHandlerGlobal = (error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            'status': 'error',
            'message': error.message
        }); 
    }

    return response.status(500).json({
        'status': 'error',
        'message': 'Internal server error'
    });
}
