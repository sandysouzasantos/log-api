const request = require('supertest');
const moment = require('moment');
const app = require('../src/app');
const Log = require('../src/models/log');

const {logOne, LogTwo, logThree, logFour, logFive, setUpDatabase} = require('./db');

beforeEach(setUpDatabase);

test('Should create a new log entry', async () => {
    const response = await request(app)
        .post('/log')
        .send({
            message: 'new log message'
        })
        .expect(201);
    const log = await Log.findById(response.body._id);
    expect(log).not.toBeNull();
});

test('Should fetch log entries between the start and end dates', async () => {
    const startDate = moment(new Date).subtract(2, 'days').format('YYYY-MM-DD');
    const endDate = moment(new Date()).format('YYYY-MM-DD');

    const response = await request(app)
        .get(`/log?startDate=${startDate}&endDate=${endDate}`)
        .send()
        .expect(200);
    expect(response.body.length).toEqual(3);
});

test('Should fetch all log entries starting at start date when there is no end date', async () => {
    const startDate = moment(new Date).subtract(5, 'days').format('YYYY-MM-DD');

    const response = await request(app)
        .get(`/log?startDate=${startDate}`)
        .send()
        .expect(200);
    expect(response.body.length).toEqual(4);
});

test('Should fetch all log entries before the endDate when there is no start date', async () => {
    const endDate = moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD');

    const response = await request(app)
        .get(`/log?endDate=${endDate}`)
        .send()
        .expect(200);
    expect(response.body.length).toEqual(3);
});

test('Should return 500 status if there are no params or if the params are invalid', async () => {
    const response = await request(app)
        .get(`/log`)
        .send()
        .expect(500);
});