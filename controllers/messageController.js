const Message = require('../models/message.js');
var mongoose = require('mongoose');
const async = require('async');
const { body, validationResult } = require('express-validator');
var dayjs = require('dayjs');

exports.post_message = [
    body('message').trim().isLength({ min: 1 }).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('/', { errors: errors.array() });
            return;
        } else {
            try {
                const user = res.locals.currentUser;
                console.log(user);
                const dateTime = dayjs(Date.now(), 'MMM D, YYYY h:mm A').toString();
                const message = new Message({
                    message: req.body.message,
                    timestamp: dateTime,
                    member: user.id,
                    author: user.username,
                });

                message.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            } catch (error) {
                next(error);
            }
        }
    },
];

exports.message_list = (req, res, next) => {
    Message.find({}, 'message timestamp member ')
        .populate('member')
        .sort([['timestamp', 'descending']])
        .exec((err, list_msg) => {
            if (err) {
                return next(err);
            }

            res.render('index', { message_list: list_msg });
        });
};

exports.message_list_member = (req, res, next) => {
    console.log(req.params.id);
    Message.find({ member: req.params.id }, 'message timestamp member ')
        .populate('member')
        .sort([['timestamp', 'descending']])
        .exec((err, list_msg) => {
            if (err) {
                return next(err);
            }

            res.render('index', { message_list: list_msg });
        });
};

exports.delete_message = async (req, res, next) => {
    const msg = await Message.findByIdAndDelete(req.params.id);

    if (!msg) {
        return next('error');
    } else {
        console.log('Deleted: ');
        res.redirect('/');
    }
};
