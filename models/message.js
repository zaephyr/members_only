const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    timestamp: { type: String },
    message: { type: String, required: true, maxlength: 256 },
    member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
});

// MessageSchema.virtual('timestamp_formatted').get(() => {

// });

module.exports = mongoose.model('Message', MessageSchema);
