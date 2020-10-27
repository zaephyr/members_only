const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    first_name: { type: String, required: true, maxlength: 100 },
    last_name: { type: String, required: true, maxlength: 100 },
    username: { type: String, required: true, maxlength: 16 },
    password: { type: String, required: true, maxlength: 100 },
    status: {
        type: String,
        required: true,
        enum: ['novice', 'member', 'elder'],
        default: 'novice',
    },
});

MemberSchema.virtual('name').get(() => {
    let fullname = '';
    if (this.first_name && this.last_name) {
        fullname = first_name + ' ' + last_name;
    }

    return fullname;
});

module.exports = mongoose.model('Member', MemberSchema);
