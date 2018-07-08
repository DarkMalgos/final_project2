const express = require('express'),
    path = require('path'),
    router = express.Router()
    //stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

router.post('/', function (req, res, next) {

    if (req.body.type == 'charge.failed')
        res.json({
            status: 'failed'
        })
    else if (req.body.type == 'charge.succeeded')
        res.json({
            status: 'succeeded'
        })
    else
        res.json({
            status: 'error'
        })
})

module.exports = router;