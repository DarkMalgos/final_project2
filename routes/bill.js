const express = require('express'),
    path = require('path'),
    router = express.Router(),
    stripe = require("stripe")('sk_test_RIWezxT3NQk8zOWv4e1McLqD');

const database = require('../services/database.js');

router.post('/:id', function (req, res, next) {
    const id = req.params.id
    var customer = null,
        total = 0

    for (let product of req.body.cart.products) {
        total += (parseFloat(product.price) * parseFloat(product.quantity))
    }

    database.sendQuery(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
        if (err) {
            console.log('error in fetching product', err)
            return
        }
        customer = results[0].stripe_id

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
                })
                return stripe.customers.createSource(customer.id, {
                    source: req.body.user.token
                })
            }).then(source => {
                stripe.charges.create({
                    amount: total * 100,
                    currency: 'eur',
                    description: 'Example charge',
                    customer: source.customer
                }).then((charge) => {
                    if (charge.status == 'succeeded') {
                        database.sendQuery(`INSERT INTO order_products (id_address, price, status, id_user) VALUES (${req.body.address.id}, ${total}, 'En attente de validation', ${id})`, (err, results) => {
                            if (err) {
                                console.error('error in insert order', err)
                                return
                            }
                            res.json({
                                charge: charge.status,
                                id: results.insertId
                            })
                        })
                    }
                })
            }).catch(function (err) {
                res.json({
                    message: err
                })
            });
        } else {
            stripe.customers.createSource(customer, {
                source: req.body.user.token
            }).then(source => {
                stripe.charges.create({
                    amount: total * 100,
                    currency: 'eur',
                    description: 'Example charge',
                    customer: source.customer
                }).then((charge) => {
                    if (charge.status == 'succeeded') {
                        database.sendQuery(`INSERT INTO order_products (id_address, price, status, id_user) VALUES (${req.body.address.id}, ${total}, 'En attente de validation', ${id})`, (err, results) => {
                            if (err) {
                                console.error('error in insert order', err)
                                return
                            }
                            res.json({
                                    charge: charge.status,
                                    id: results.insertId
                                })
                        })
                    }
                }).catch(e => {
                    console.error('ceci est une error', e)
                })
            })
        }
    })
})

module.exports = router;