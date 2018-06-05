var express = require('express');
var router = express.Router();

//var database = require('../services/database.js');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
    database.sendQuery('SELECT * FROM users', function (err, results) {
        if (err) {
            console.error('Error in fetching ursers', err)
        } else {
            res.json(results)
        }
    })
});*/

router.post('/', function (req, res, next) {
    console.log(req.body)
})

module.exports = router;
