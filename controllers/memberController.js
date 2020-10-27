const Member = require('../models/member.js');
const async = require('async');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const path = require('path');

exports.signup_form = (req, res, next) => {
    res.render('sign_up', { title: 'Sign Up Form' });
};

exports.create_member = [
    body('first_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),
    body('last_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Last name must be specified.')
        .isAlphanumeric()
        .withMessage('Last name has non-alphanumeric characters.'),
    body('username').trim().isLength({ min: 2 }).escape().withMessage('Username must be specified.'),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .escape()
        .withMessage('Password must be specified and of atleast 6 length.'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            console.log(errors.array());
            res.render('sign_up', { msg: 'Failed Signup', errors: errors.array() });
            return;
        } else {
            try {
                const username = req.body.username;
                const password = req.body.password;
                const userExists = await Member.findOne({ username });
                if (userExists) return res.render('sign_up', { msg: 'Username alread taken' });

                let hashedPass = await bcrypt.hash(password, 10);

                const member = new Member({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: username,
                    password: hashedPass,
                });

                member.save((err) => {
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
