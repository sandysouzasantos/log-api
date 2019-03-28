const express = require('express');
const moment = require('moment');

const Log = require('../models/log');

const router = new express.Router();

router.post('/log', async (req, res, next) => {
    const log = new Log(req.body);

    try {
        await log.save();
        res.status(201).send(log);
    } catch (e) {
        res.status(400).send(e)
    }

});

router.get('/log', async (req, res, next) => {

    let startDate, endDate;

    if (req.query.startDate) {
        startDate = new Date(req.query.startDate);
    }

    if (req.query.endDate) {
        const date = new Date(req.query.endDate);
        endDate = moment(date).add(1, 'day');
    }

    try {
        let logs;

        if (startDate && !endDate) {
            logs = await Log.find({
                date: {
                    $gt: startDate.toISOString()
                }
            });
        } else if (!startDate && endDate) {
            const defaultStartDate = moment(endDate).subtract(7, 'day');
            logs = await Log.find({
                date: {
                    $gt: defaultStartDate.toISOString(),
                    $lt: endDate.toISOString()
                }
            });
        } else {
            logs = await Log.find({
                date: {
                    $gt: startDate.toISOString(),
                    $lt: endDate.toISOString()
                }
            });
        }

        res.send(logs);
    } catch (e) {
        res.status(500).send();
    }

});

module.exports = router;