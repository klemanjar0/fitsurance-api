var express = require('express');
var router = express.Router();

const CardController = require('../controllers/card');



router.post('/create', CardController.create);
router.get('/get', CardController.get);
router.delete('/delete', CardController.delete);

module.exports = router;
