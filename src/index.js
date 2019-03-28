const express = require('express');

require('./db/mongoose');

const logRouter = require('./routers/log');

const app = express();
const port = 3000;

app.use(express.json());
app.use(logRouter);

app.listen(port, () => {
    console.log('server is up on port ' + port);
});