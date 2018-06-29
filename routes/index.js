const express = require('express'),
      path = require('path'),
      router = express.Router()

const database = require('../services/database.js');

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'))
})

module.exports = router;