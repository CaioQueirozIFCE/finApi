const express = require('express');
const routes = require('./routes/index.routes');
const {ExceptionHandlerGlobal} = require('./middlewares/ErrorsMiddlewares');

const app = express();

app.use(express.json());

// module.exports = customers = {
//     customers : []
// };

app.use(routes);

app.use(ExceptionHandlerGlobal);


app.listen(3333, () => console.log('Server is Running!!!!'));