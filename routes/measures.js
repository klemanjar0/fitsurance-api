var express = require('express');
var router = express.Router();

const MeasureController = require('../controllers/measure');

router.post('/create', MeasureController.create);
router.get('/get/:id', MeasureController.get);
router.get('/getByUser/:id', MeasureController.getAll);
router.delete('/delete', MeasureController.delete);
router.delete('/deleteall', MeasureController.deleteAll);
router.post('/fill', MeasureController.fillRandom);

module.exports = router;
