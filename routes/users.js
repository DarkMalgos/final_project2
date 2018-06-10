const express = require('express'),
      router =  express.Router(),
      bcrypt =  require('bcrypt')
const database = require('../services/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    /*database.sendQuery(`SELECT * FROM users u WHERE u.email LIKE ${req.query.email}`, function (err, results) {
        if (err) {
            console.error('Error in fetching ursers', err)
        } else {
            if (results.length > 0) {
                if (bcrypt.compare(req.query.password, 10, results[0].password)) {
                    delete results[0].password
                    res.json(results[0])
                } else {
                    res.json({
                        error: '2'
                    })
                }

            } else {
                res.json({
                    error: '1'
                })
            }

        }
    })*/
    database.sendQuery(`SELECT * FROM users u`, function (err, results) {
        if (err) console.error('Error in fetching users', err)
        res.json(results)
    })
});

router.post('/', function (req, res, next) {
    res.json(req.body)
})

module.exports = router;
