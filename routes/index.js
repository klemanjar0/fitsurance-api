var express = require('express');
var router = express.Router();


const cards = require('./cards');
const users = require('./users');

router.use('/card', cards);
router.use('/user', users);

module.exports = router;
