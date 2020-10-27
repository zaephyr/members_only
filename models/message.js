const mongoose = require('mongoose');
import { format } from 'date-fns';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true, maxlength: 20 },
    timestamp: { type: Date },
    text: { type: String, required: true, maxlength: 256 },
    author: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
});

MessageSchema.virtual('timestamp_formatted').get(() => {
    return format(this.timestamp, 'PPPp');
});

module.exports = mongoose.model('Message', MessageSchema);
