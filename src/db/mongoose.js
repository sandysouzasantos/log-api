const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/log-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});