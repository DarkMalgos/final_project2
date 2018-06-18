const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt')
const database = require('../services/database.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log(req.session)
    res.json(req.session.user)
});

router.post('/', function (req, res, next) {
    database.sendQuery(`SELECT * FROM users WHERE email LIKE '${req.body.user.email}'`, function (err, results) {
        if (err) {
            console.error('error in fetching users', err)
            return
        }

        if (results.length > 0) {
            res.json('Cet email déjà utilisé')
            return
        }
    })

    bcrypt.hash(req.body.user.password, process.env.SALT).then(function (hash) {
        database.sendQuery(`INSERT INTO users (firstname, lastname, email, password, tel) VALUES ('${req.body.user.firstname}', '${req.body.user.lastname}', '${req.body.user.email}', '${hash}', '${req.body.user.tel}')`, function (err, results) {
            if (err) {
                console.error('error in adding user', err)
                return
            }
            req.session.toto = results.insertId
            database.sendQuery(`INSERT INTO address (street, city, zipcode, id_user) VALUES ('${req.body.address.street}', '${req.body.address.city}', '${req.body.address.zipcode}', ${results.insertId})`, function (err, results) {
                if (err) console.error('error in adding address', err)
                req.session.save(function(err) {
                    if (err) {
                        console.log('error in save session', err)
                    } else {
                        console.log('test', req.session)
                        res.json({
                            user: req.session.user
                        })
                    }
                })
            })
        })
    });

})

router.post('/connexion', function (req,res, next) {
    database.sendQuery(`SELECT * FROM users WHERE email LIKE '${req.body.user.email}'`, function (err, results) {
        if (err) {
            console.error('error in fetching users', err)
            return
        }
        if (results.length > 0) {
            bcrypt.compare(req.body.user.password, results[0].password).then(result => {
                if (result == true) {
                    req.session.user = results[0].id
                    req.session.save(function(err) {
                        if (err) {
                            console.error('error in save session', err)
                        } else {
                            console.log(req.session)
                            res.json({
                                user: req.session.user
                            })
                        }
                    })
                } else {
                    res.json("Le mot de passe n'est pas correct")
                }
            })
        } else {
            res.json('Aucun utilisateur inscrit avec cette email')
        }
    })

})

module.exports = router;
