const express = require('express');

require('./db/mongoose');

const logRouter = require('./routers/log');

const app = express();


app.use(express.json());
app.use(logRouter);

module.exports = app;