const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt')
const database = require('../services/database.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    database.sendQuery(`SELECT * FROM products`, function (err, results) {
        if (err) {
            console.error('error in fetching products', err)
            return
        }
        res.json(results)
    })
});

router.get('/order/:id', function (req, res, next) {
    let id = req.params.id,
        q
    if (id == 'all')
        q =`SELECT * FROM order_products WHERE status NOT LIKE 'Livrée'`
    else
        q = `SELECT * FROM order_products WHERE id = ${id}`

    database.sendQuery(q, function (err, results) {
        if (err) {
            console.error('error in fetching products', err)
            return
        }
        if (id == 'all')
            res.json(results)
        else
            res.json(results[0])

    })
});

router.post('/order/:id', function (req, res, next) {
    let id = req.params.id

    console.log(req.body.status)
    database.sendQuery(`UPDATE order_products SET status='${req.body.status}' WHERE id = ${id}`, function (err, results) {
        if (err) {
            console.error('error in fetching products', err)
            return
        }
        res.json('done')
    })
});

module.exports = router;
