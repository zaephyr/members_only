var express = require('express');
var router = express.Router();
const passport = require('passport');

let member_controller = require('../controllers/memberController');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/signup', member_controller.signup_form);

router.post('/signup', member_controller.create_member);

module.exports = router;
