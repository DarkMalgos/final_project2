const express = require('express'),
      path = require('path'),
      router = express.Router()

router.get('/', function (req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'))
})

module.exports = router;