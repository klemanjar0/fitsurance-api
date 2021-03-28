var express = require('express');
var router = express.Router();
const path = require("path");

const AuthController = require('../controllers/user');
const UserController = require('../controllers/userlogic');
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.send('so what');
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', passport.authenticate('jwt', {session: false}, null), AuthController.me);
router.delete('/me', passport.authenticate('jwt', {session: false}, null), AuthController.deleteme);
//router.put('/me/update-password', passport.authenticate('jwt', {session: false}, null), AuthController.updatepassword)

router.get('/getpulse', UserController.heartEstimate);
router.get('/getsleep', UserController.sleepEstimate);

module.exports = router;
