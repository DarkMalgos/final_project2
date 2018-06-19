const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt')
const database = require('../services/database.js');

/* GET users listing. */
router.get('/:category', function (req, res, next) {
    let category = req.params.category
    database.sendQuery(`SELECT * FROM products WHERE category LIKE '${category}'`, function (err, results) {
        if (err) {
            console.error('error in fetching products', err)
            return
        }
        res.json(results)
    })
});

module.exports = router;
