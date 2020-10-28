const mongoose = require('mongoose');
var moment = require('moment');
var dayjs = require('dayjs');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    timestamp: { type: String },
    message: { type: String, required: true, maxlength: 256 },
    member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
});

MessageSchema.virtual('timestamp_formatted').get(() => {
    return dayjs(this.timestamp, 'HH:mm, MMM D, YY').toString();
});

module.exports = mongoose.model('Message', MessageSchema);
