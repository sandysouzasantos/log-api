const mongoose = require('mongoose');
const moment = require('moment');

const Log = require('../src/models/log');

const logOne = {
    _id: new mongoose.Types.ObjectId(),
    message: 'App crashed',
    date: moment(new Date()).subtract(10, 'days')
};

const logTwo = {
    _id: new mongoose.Types.ObjectId(),
    message: 'App crashed',
    date: moment(new Date()).subtract(5, 'days')
};

const logThree = {
    _id: new mongoose.Types.ObjectId(),
    message: 'App crashed',
    date: moment(new Date()).subtract(2, 'days')
};

const logFour = {
    _id: new mongoose.Types.ObjectId(),
    message: 'App crashed',
    date: moment(new Date()).subtract(1, 'days')
};

const logFive = {
    _id: new mongoose.Types.ObjectId(),
    message: 'App crashed',
    date: moment(new Date())
};

const setUpDataBase = async () => {
    await Log.deleteMany();
    await new Log(logOne).save();
    await new Log(logTwo).save();
    await new Log(logThree).save();
    await new Log(logFour).save();
    await new Log(logFive).save();
};

module.exports = {
    logOne,
    logTwo,
    logThree,
    logFour,
    logFive,
    setUpDataBase
};