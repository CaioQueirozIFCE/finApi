exports.ExceptionHandlerGlobal = (error, request, response, next) => {
    if (error && error.statusCode) {
        response.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message
        });
    } else {
        console.log(error);
    }
    next();
}
