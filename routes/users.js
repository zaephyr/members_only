var express = require('express');
var router = express.Router();

let message_controller = require('../controllers/messageController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/:id', message_controller.message_list_member);

module.exports = router;
