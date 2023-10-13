const express = require('express');
const app = express();
const authRouter = require('./auth.js');
const servicesRouter = require('./services.js');

app.use('/auth', authRouter);
app.use('/services', servicesRouter);

app.listen(3000, () => {
    console.log('Servidor Node.js en funcionamiento en el puerto 3000');
});
