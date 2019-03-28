const mongoose = require('mongoose');

const Log = mongoose.model('Log', {
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Log;