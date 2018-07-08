const express = require('express'),
    path = require('path'),
    router = express.Router()
    //stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

router.post('/', function (req, res, next) {

    console.log(req.body)
    res.json({
        status: req.body.status
    })
})

module.exports = router;