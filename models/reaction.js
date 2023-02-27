const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {

        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

module.exports = reactionSchema;