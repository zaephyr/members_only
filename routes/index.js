var express = require('express');
var router = express.Router();

let member_controller = require('../controllers/memberController');
let message_controller = require('../controllers/messageController');

/* GET home page. */
router.get('/', message_controller.message_list);

router.post('/message', message_controller.post_message);
router.post('/message/:id/delete', message_controller.delete_message);

router.get('/signup', member_controller.signup_form);
router.post('/signup', member_controller.create_member);
router.get('/dashboard', member_controller.get_dashboard);
router.post('/upgrade', member_controller.update_status);

module.exports = router;
