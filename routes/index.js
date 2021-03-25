var express = require('express');
var router = express.Router();


const cards = require('./cards');
const users = require('./users');
const measures = require('./measures');

router.use('/card', cards);
router.use('/user', users);
router.use('/measure', measures);

module.exports = router;
