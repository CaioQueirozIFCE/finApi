exports.ExceptionHandlerGlobal = (error, request, response, next) => {
    console.log('error => ', error)
    if (error && error.statusCode) {
        return response.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message
        });
    } else {
        return response.status(500).json({
            message: error.message
        });
    }
    return next();
}
