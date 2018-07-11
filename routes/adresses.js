const express = require('express'),
      router =  express.Router()

const database = require('../services/database.js');

router.get('/:id', function (req, res, next) {
    let id = req.params.id

    database.sendQuery(`SELECT * FROM address WHERE id_user = ${id}`, (err, results) => {
        if (err) {
            console.error('error in fetching address', err)
            return
        }

        res.json(results)
    })
})

router.post('/:id', function (req, res, next) {
    let id = req.params.id

    database.sendQuery(`INSERT INTO address (street, city, zipcode, id_user) VALUES ('${req.body.address.street}', '${req.body.address.city}', '${req.body.address.zipcode}', ${id})`, (err, results) => {
        if (err) {
            console.error('error in fetching address', err)
            return
        }
        res.json(results.insertId)
    })
})

router.delete('/:id', function (req, res, next) {
    let id = req.params.id

    database.sendQuery(`DELETE FROM address WHERE id = ${id}`, (err, results) => {
        if (err) {
            console.error('error in deleting address', err)
            return
        }

        res.json(results)
    })
})


module.exports = router;
