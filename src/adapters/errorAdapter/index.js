exports.resolve = (handlerFn) => {
  return (request, response, next) => {
    return Promise.resolve(handlerFn(request, response, next)).catch(error => next(error));
  }
}