const express = require('express'),
      path = require('path'),
      router = express.Router(),
      stripe = require("stripe")(`${process.env.STRIPE_KEY}`);

router.get('/', function (req, res, next) {
    if (req.body.user.id) {
        stripe.customers.retrieve(
            req.body.user.id,
            function (err, customer) {
                if (err) {
                    console.error('error in retrieve user', err)
                    return
                }
                stripe.charges.create({
                    amount: 2000,
                    currency: "eur",
                    source: "tok_amex", // obtained with Stripe.js
                    description: "Charge for william.thompson@example.com"
                }, function (err, charge) {
                    // asynchronously called
                });
            }
        );
    }
})

module.exports = router;