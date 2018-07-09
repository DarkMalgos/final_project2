const express = require('express'),
    path = require('path'),
    router = express.Router(),
    stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

const database = require('../services/database.js');

router.post('/:id', function (req, res, next) {
    let id = req.params.id,
        customer = null,
        total = 0

    database.sendQuery(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
        if (err) {
            console.log('error in fetching product', err)
            return
        }
        customer = results[0].stripe_id
    })

    for (let product of req.body.cart.products) {
        total += (parseFloat(product.price)*parseFloat(product.quantity))
    }

    total += req.body.cart.taxe.price

    if (customer == null) {
        stripe.customers.create({
            description: 'create toto'
        }).then((customer) => {
            database.sendQuery(`UPDATE users SET stripe_id = '${customer.id}' WHERE id = ${id}`, (err, results) => {
                if (err) {
                    console.log('error in updating user', err)
                    return
                }
                console.log(results)
            })
            return stripe.customers.createSource(customer.id, {
                source: req.body.user.token
            })
        }).then(source => {
            console.log('source', source)
            stripe.charges.create({
                amount: total*100,
                currency: 'eur',
                description: 'Example charge',
                customer: source.customer
            }).then(charge => {
                console.log(charge)
                res.json({
                    customer: source.customer
                })
            })
        }).catch(function (err) {
            console.log(err)
            res.json({
                message: err
            })
        });
    } else {
        stripe.charges.create({
            amount: total*100,
            currency: 'eur',
            description: 'Example charge',
            customer: customer
        }).then((charge) => {
            console.log(charge)
            res.json({
                customer: customer
            })
        })
    }
})

module.exports = router;