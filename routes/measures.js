var express = require('express');
var router = express.Router();

const MeasureController = require('../controllers/measure');

router.post('/create', MeasureController.create);
router.get('/get', MeasureController.get);
router.delete('/delete', MeasureController.delete);
router.delete('/deleteall', MeasureController.deleteAll);
router.post('/fill', MeasureController.fillRandom);

module.exports = router;
