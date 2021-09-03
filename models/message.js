const { Schema, model } = require('mongoose');

const schema = new Schema({
    text: String,
    ratings: [],
    avgRating: Number,
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }
});

const Message = model('Message', schema);

module.exports = { Instance: Message, Schema };
