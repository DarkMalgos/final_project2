const express = require('express'),
    path = require('path'),
    router = express.Router(),
    stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

const database = require('../services/database.js');

router.post('/', function (req, res, next) {
    res.json({
        status: req.body.status
    })
})

module.exports = router;