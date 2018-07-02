const express = require('express'),
    path = require('path'),
    router = express.Router(),
    stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

router.post('/', function (req, res, next) {
    console.log('toto')
    stripe.customers.create({
        description: 'create toto'
    }).then((customer) => {
        return stripe.customers.createSource(customer.id, {
            source: req.body.user.token
        })
    }).then(source => {
        console.log('source', source)
        stripe.charges.create({
            // amount: req.body.totalPrice.split(".").join(''),
            amount: 100,
            currency: 'eur',
            description: 'Example charge',
            customer: source.customer
        });
        res.json({
            customer: source.customer
        })
    }).catch(function (err) {
        console.log(err)
        res.json({
            message: err
        })
        // Deal with an error
    });
})

module.exports = router;