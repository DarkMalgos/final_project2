const express = require('express'),
    path = require('path'),
    router = express.Router(),
    stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

const database = require('../services/database.js');

router.post('/', function (req, res, next) {
    console.log(req.body)
})

module.exports = router;