const mongoose = require('mongoose');
var moment = require('moment');
var dayjs = require('dayjs');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    timestamp: { type: Date, default: Date.now() },
    message: { type: String, required: true, maxlength: 256 },
    member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
});

MessageSchema.virtual('timestamp_formatted').get(() => {
    return dayjs(this.timestamp).toDate();
});

module.exports = mongoose.model('Message', MessageSchema);
