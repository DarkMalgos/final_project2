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

module.exports = router;
