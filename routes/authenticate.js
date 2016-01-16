var express = require('express');
var app = express();
var router = express.Router();
var userAuthentication = require('../config/authenticateUser');

//authenticate route
router.route('/authenticate')

//find user to authenticate
	.post(userAuthentication);

module.exports = router;