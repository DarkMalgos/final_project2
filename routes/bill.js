const express = require('express'),
    path = require('path'),
    router = express.Router(),
    stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

const database = require('../services/database.js');

router.post('/:id', function (req, res, next) {
    let id =
    //todo: recalculer le prix ici

    //todo: récuperer les info utilisateur + check si customer id
    database.sendQuery(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
        if (err) {
            console.log('error in fetching product', err)
            return
        }
        console.log(results)
    })
    stripe.customers.create({
        description: 'create toto'
    }).then((customer) => {
        // todo : send en base le customer id
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