class AppError extends Error{

    constructor(statusCode = 400){
        super(message);
        this.name = 'Error';
        this.statusCode = statusCode;
    }
}

module.exports = AppError;