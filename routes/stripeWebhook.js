const express = require('express'),
    path = require('path'),
    router = express.Router()
    //stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

const database = require('../services/database.js');

router.post('/', (req, res, next) => {
    console.log('toto')
    let status
    if (req.body.type == 'charge.failed')
        status ='failed'
    else if (req.body.type == 'charge.succeeded')
        status = 'succeeded'
    else
        status = 'error'

    database.sendQuery(`INSERT INTO events (charge_id, status) VALUES ('${req.body.data.object.id}', '${status}')`, (err, results) => {
        if (err) {
            console.error('error in adding event', err)
            return
        }
    })
})


router.get('/:charge', (req, res, next) => {
    let charge = req.params.charge

    database.sendQuery(`SELECT * FROM events WHERE charge_id LIKE '${charge}'`, (err, results) => {
        if (err) {
            console.log('Error in fetching events', err)
            return
        }

        if (results.length > 0) {
            res.json(results[0].status)
        } else {
            res.json('error')
        }
    })
})

module.exports = router;